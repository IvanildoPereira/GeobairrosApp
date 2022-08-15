const { Model, DataTypes} = require('sequelize');

class Address extends Model{
    static init(sequelize){
        super.init({
            fachada_img: DataTypes.STRING,
            logradouro: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            uf: DataTypes.STRING,
            latitude: DataTypes.DECIMAL,
            longitude: DataTypes.DECIMAL
        },{
            sequelize
        }
        )        
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
        this.hasMany(models.Product, {foreignKey: 'address_id', as: {singular: 'address', plural: 'addresses'}})   
    }

}

module.exports = Address;