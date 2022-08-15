const UserFollower = require("../models/UserFollower");
const User = require("../models/User");
const HttpError = require("../models/http-error");


const followSystem = async (req, res, next) => {
    const { userFollowId } = req.params;
    
    const user = await User.findByPk(req.userData.id);
    if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

    if (user.id === userFollowId) return  res.status(404).json({ Message: "Can't follow yourself!" })

    const follow = await UserFollower.findOne({where: {
        user_id: user.id,
        follower_id: userFollowId
    }})

    if(follow){
        await follow.destroy();
        return res.json({ message: "Unfollowed with Success!"});
    }else{
        try {
            const newFollower = await UserFollower.create({
              user_id: req.userData.id,
              follower_id: userFollowId,
            });
            res.json({ message: "Followed with Success!"});
          } catch (err) {
            const error =  new HttpError("It wasn't possible save the Address!" + err, 500);
            return next(error);
          }

    }
};

exports.followSystem = followSystem;