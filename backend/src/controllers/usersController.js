const User = require('../models/User');
const UserFollower = require('../models/UserFollower');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { registerValidation, loginValidation } = require('../validation/validation');
const HttpError = require("../models/http-error");
const fs = require('fs');
const options = require('dotenv/lib/env-options');
require('dotenv/config');

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    // Validate the body request
    const { error } = registerValidation(req.body);
    if (error) {
        return next(new HttpError(error.details[0].message, 400))
    }

    // Check if the user is already in the database
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
        return next(new HttpError("Email already existed!", 400));
    }
    // Hash the passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ avatar_img: null, name, email, password: hashedPassword, description: 'Escreva aqui a descrição de seu negocio e serviços' });
        
        await UserFollower.create({
            user_id: user.id,
            follower_id: user.id,
        });

        res.status(200).json({ message: "Created with sucess!!" })
    } catch (err) {
        const error = new HttpError("It wasn't possible create a new account!", 500);
        return next(error)
    }

}

const login = async (req, res, next) => {
    // Validate the body of request
    const { error } = loginValidation(req.body);
    if (error) {
        return next(new HttpError(error.details[0].message, 400))
    }

    // Checking if the email exists
    const emailExist = await User.findOne({ where: { email: req.body.email } });
    if (!emailExist) {
        return next(new HttpError("Email doesn't exist", 404));
    }
    // Checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, emailExist.password);
    if (!validPassword) {
        return next(new HttpError('Password is invalid!', 400));
    }
    // Create and assign a token
    const token = jwt.sign({ id: emailExist.id, email: emailExist.email }, process.env.TOKEN_SECRET);

    res.status(200).json({
        message: "Logged with success",
        token: token,
        id: emailExist.id,
        avatar_img: process.env.API_URL + emailExist.avatar_img,
        name: emailExist.name
    })
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userData.id, {
            attributes: ["id", "name", "email", "description", "avatar_img"]
        });
        if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

        user.avatar_img = process.env.API_URL + user.avatar_img;

        let numberOfFollowers = await UserFollower.count({
            where:{ follower_id: user.id }
        }) 
        
        let numberOfFollowing = await UserFollower.count({
            where:{ user_id: user.id }
        }) 

        res.json({info: user, numberOfFollowers: numberOfFollowers - 1, numberOfFollowing: numberOfFollowing - 1});
    } catch (err) {
        const error = new HttpError("Can't get the user!", 500);
        return next(error)
    }
}



const updateUser = async (req, res, next) => {
    const { name, email, description } = req.body;
    const user = await User.findByPk(req.userData.id);
    //let hashedPassword { oldPassword, newPassword };
    let avatar = user.avatar_img;
    let newAvatar;
    if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

    if (req.file !== undefined) {
        newAvatar = req.file.path;
    }

    // Check if the user is already in the database
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist && email !== user.email) {
        return next(new HttpError("Email already existed! Try Another Email", 400));
    }

    /*if (newPassword) {
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return next(new HttpError('Password is invalid!', 400));
        }
        hashedPassword = await bcrypt.hash(newPassword, 10);
    } else {
        hashedPassword = user.password;
    }*/

    try {
        await user.update({
            name,
            email,
            description,
            avatar_img: newAvatar
        });

        if (fs.existsSync(avatar)) {
            fs.unlink(avatar, err => {
                if(err){
                    return next(new HttpError('Somethinh goes wrong on file system.', 500));
                }
            });
        }

        res.json({ message: "Updated user with Success!" })

    } catch (err) {
        const error = new HttpError("It wasn't possible update the user!", 500);
        return next(error)

    }
}

const forgotPassword = async (req, res, next) =>{
    const { email } = req.body;


    // Check if the user is already in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return next(new HttpError("Email doesn't exist in your DataBase!", 400));
    }

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1);

    try {
        await user.update({
            passwordResetToken: token,
            passwordResetExpires: now
        });
        Queue.add('RecoveryPassword', { email, token });
        res.json({ message: "Check your email to reset the password!" })

    } catch (err) {
        const error = new HttpError(err, 500);
        return next(error)

    }
}

const verifyToken = async (req, res, next) =>{
    const { token } = req.body;

    const user = await User.findOne({ where: { passwordResetToken: token } });
    if (!user) {
        return next(new HttpError("Token Invalid!", 400));
    }

    const now = new Date();
    if( now > user.passwordResetExpires){
        return next(new HttpError("Token expired, generete a new one!", 403));
    }

    res.json({name: user.name})
}

const updatePassword = async(req, res, next) =>{
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.userData.id);
    if (!user) return res.status(404).json({ Message: "User doesn't exist!" });
    console.log('Atual:' + oldPassword + 'nova: ' + newPassword )

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
        return next(new HttpError('Password is invalid!', 400));
    }
    if(validPassword === newPassword){
        return next(new HttpError('New password is equal to the older one!', 400));
    }
    
    hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({
        password: hashedPassword
    })

    res.json('Senha Atualizada com Sucesso!')

}


const resetPassword = async(req, res, next) =>{
    const { token, newPassword } = req.body;
    const user = await User.findOne({ where: { passwordResetToken: token }});
    console.log('Atual:' + oldPassword + 'nova: ' + newPassword )


    if(!user){
        return next(new HttpError("Token Invalid!", 403));
    }

    const now = new Date();
    if( now > user.passwordResetExpires){
        return next(new HttpError("Token expired, generete a new one!", 403));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
        await user.update({
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetExpires: null
        });
        res.json({ message: "Password Reseted with Success!" })

    } catch (err) {
        const error = new HttpError("It wasn't possible reset the Password!", 500);
        return next(error)

   }

    
}

const deleteUser = async(req, res, next)=>{
    const user = await User.findByPk(req.userData.id);
    if (!user) return res.status(404).json({ Message: "User doesn't exist!" });
    await user.destroy();
    res.json("Usuario deletado");
}

exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.forgotPassword = forgotPassword;
exports.verifyToken = verifyToken;
exports.updatePassword = updatePassword;
exports.resetPassword = resetPassword;
exports.deleteUser = deleteUser;
