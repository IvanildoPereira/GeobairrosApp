'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user_followers', {
         id: {
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
           unique: true
         },
    
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        follower_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'users', key: 'id'},
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
      return queryInterface.dropTable('products');
  }
};
