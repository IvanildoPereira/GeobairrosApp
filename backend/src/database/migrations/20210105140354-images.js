'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('images', {
         id: {
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
           unique: true
         },
    
         filename:{
           type: Sequelize.STRING,
           allowNull: false
         },
         
        path:{
          type: Sequelize.STRING,
          allowNull: false
        },

        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'products', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
      return queryInterface.dropTable('images');
  }
};
