'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('products', {
         id: {
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
           unique: true
         },
    
         name:{
           type: Sequelize.STRING,
           allowNull: false
         },
         
        description:{
          type: Sequelize.TEXT,
          allowNull: false
        },

        price:{
          type: Sequelize.DOUBLE(10,2),
          allowNull: false
        },

        type:{
          type: Sequelize.STRING,
          allowNull: false
        },

        whatsapp:{
          type: Sequelize.STRING,
          allowNull: true
        },

        link:{
          type: Sequelize.STRING,
          allowNull: true
        },

        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        address_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {model: 'addresses', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },

        created_at:{
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('products');
  }
};
