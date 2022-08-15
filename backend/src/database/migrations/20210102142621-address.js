'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('addresses', {
         id: {
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
           unique: true
         },

         fachada_img:{
           type: Sequelize.STRING,
           allowNull: true
         },
    
         logradouro:{
           type: Sequelize.STRING,
           allowNull: false
         },
         
        bairro:{
          type: Sequelize.STRING,
          allowNull: false
        },

        cidade:{
          type: Sequelize.STRING,
          allowNull: false
        },

        uf:{
          type: Sequelize.STRING(2),
          allowNull: false
        },

        latitude:{
          type: Sequelize.DECIMAL(10,8),
          allowNull: false
        },

        longitude:{
          type: Sequelize.DECIMAL(11,8),
          allowNull: false
        },

        user_id: {
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
      return queryInterface.dropTable('addresses');
  }
};
