const { Model, DataTypes} = require('sequelize');

class User extends Model{
    static init(sequelize){
        super.init({
            avatar_img: DataTypes.STRING,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            description: DataTypes.TEXT,
            passwordResetToken: DataTypes.STRING,
            passwordResetExpires: DataTypes.DATE
        },{
            sequelize
        }
        )
        
    }
    static associate(models){
        this.hasMany(models.Address, {foreignKey: 'user_id'});
        this.hasMany(models.UserFollower, {foreignKey: 'user_id'});   
        this.hasMany(models.Product, {foreignKey: 'user_id', as: 'userProduct'});  
    }
}

module.exports = User;