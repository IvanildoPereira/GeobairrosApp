'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
         id: {
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
           unique: true
         },
         avatar_img:{
           type: Sequelize.STRING,
           allowNull: true
         },
         name:{
           type: Sequelize.STRING,
           allowNull: false
         },
         email:{
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        password_reset_token: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
          defaultValue: "Escreva aqui a descrição de seu negocio e serviços"
        },
        password_reset_expires: {
          type: Sequelize.DATE,
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
      return queryInterface.dropTable('users');
  }
};
