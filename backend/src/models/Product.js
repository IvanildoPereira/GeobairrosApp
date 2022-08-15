const { Model, DataTypes} = require('sequelize');

class Product extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            price: DataTypes.DOUBLE,
            type: DataTypes.STRING,
            whatsapp: DataTypes.STRING,
            link: DataTypes.STRING
        },{
            sequelize,
        }
        )   
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'userProduct'});        
        this.belongsTo(models.Address, {foreignKey: 'address_id', as: 'address'});
        this.hasMany(models.Image, { foreignKey: 'product_id', as: {singular: 'image', plural: 'images'} });
    }
}

module.exports = Product;