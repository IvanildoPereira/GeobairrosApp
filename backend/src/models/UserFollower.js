const { Model } = require('sequelize');

class UserFollower extends Model{
    static init(sequelize){
        super.init({
        },{
            sequelize,
            //modelName: 'user_followers'
        }
        )
        
    }
    static associate(models){
       this.belongsTo(models.User, {foreignKey: 'user_id'});
       this.belongsTo(models.User, {foreignKey: 'follower_id'});
    }
}

module.exports = UserFollower;