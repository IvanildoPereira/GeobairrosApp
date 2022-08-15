const User = require('../models/User');
const HttpError = require("../models/http-error")
const UserFollower = require('../models/UserFollower');
const { Op } = require('sequelize');
const Product = require('../models/Product');
require('dotenv/config');

const getPerfil = async (req, res, next) => {
    const { perfilId } = req.params;
    try {
        const user = await User.findByPk(req.userData.id);
        if (!user) return res.status(404).json({ Message: "User doesn't exist!" });
        const perfil = await User.findByPk(perfilId);
        if (!perfil) return res.status(404).json({ Message: "Perfil doesn't exist!" });

        let isFollowing = false;
        const follow = await UserFollower.findOne({where: {
            user_id: user.id,
            follower_id: perfil.id
        }})

        if(follow){
            isFollowing = true;
        }

        let numberOfFollowers = await UserFollower.count({
          where:{ follower_id: perfilId }
        }) 

        const { count: numberOfProducts, rows: products } = await Product.findAndCountAll({
            attributes: ["id", "name", "description", "price", "type"],
            include:[
              { association: "images", attributes: ["id","path"], limit: 1 }
            ], 
            where: {
              user_id: perfil.id,
              type: 'Produto'
            },
            limit: 5
          }
        )

        const { count: numberOfServices, rows: services } = await Product.findAndCountAll({
            attributes: ["id", "name", "description", "price", "type"],
            include:[
              { association: "images", attributes: ["id","path"], limit: 1 }
            ], 
            where: {
              user_id: perfil.id,
              type: 'Servico'
            },
            limit: 5
          }
        )

        perfil.avatar_img = process.env.API_URL + perfil.avatar_img;
        
        res.json({
            perfil:{
                id: perfil.id,
                avatar_img: perfil.avatar_img,
                name: perfil.name,
                description: perfil.description,
                isFollowing,
                numberOfFollowers: numberOfFollowers - 1,
                numberOfServices,
                numberOfProducts,
                products,
                services
            }
        });
    } catch (err) {
        const error = new HttpError("Can't get the Perfil!", 500);
        return next(error)
    }
}

const getPerfils = async (req, res, next) =>{
  const { search } = req.query;
  const user = await User.findByPk(req.userData.id);
  if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

    let options = {
        where: {}
    }

    options.where.id = {
        [Op.not]: user.id
    }

    if (search) {
        options.where = { 
            ...options.where,
            [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              }
            },
            {
              description: {
                [Op.like]: "%" + search + "%"
              }
            }
          ]
        };
    }

    const perfils = await User.findAll({
        attributes: ["id", "name", "description", "avatar_img"],
        where: options.where
      });

    perfils.forEach(perfil =>{
        perfil.avatar_img = process.env.API_URL + perfil.avatar_img;
    })

    res.json(perfils)
}

exports.getPerfil = getPerfil;
exports.getPerfils = getPerfils; 