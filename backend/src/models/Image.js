const { Model, DataTypes} = require('sequelize');

class Image extends Model{
    static init(sequelize){
        super.init({
            filename: DataTypes.STRING,
            path: DataTypes.STRING,
        },{
            sequelize,
        }
        )   
    }

    static associate(models){
        this.belongsTo(models.Product, {foreignKey: 'product_id'});        
    }
}

module.exports = Image;