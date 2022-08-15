'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    [
      {
        avatar_img: 'uploads/examples/igreja.jpeg',
        name: 'Paróquia N. Sra. do Rócio e São Vicente de Paulo',
        email: 'paroquiarociovicentepaulo@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/geekstyles.jpg',
        name: 'Geek Styles Hair',
        email: 'geekstyles@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/classestilo.jpg',
        name: 'Classe Stylos Femmale hairs',
        email: 'classestylosfemmalehairs@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/donaana.jpg',
        name: 'Dona Ana',
        email: 'anamaria@gmail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/donalucia.jpg',
        name: 'Dona Lucia',
        email: 'luciapereira@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/barze.jpg',
        name: 'Bar do Zé',
        email: 'josemariano@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/barchico.jpg',
        name: 'Bar do Chico',
        email: 'franciscojose@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/padaria.jpg',
        name: 'Padaria União',
        email: 'padariauniao@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/mercadinho.jpg',
        name: 'Mercadinho da Vila',
        email: 'josesilva@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },


      {
        avatar_img: 'uploads/examples/contrucao.jpg',
        name: 'Loja Mi - Material de Construção',
        email: 'construcao@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/acougue.jpg',
        name: 'Açougue Imperio das Carnes',
        email: 'imperiocarnes@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/farmacia.jpg',
        name: 'Farmacia Preço Baixo',
        email: 'farmaciaprecobaixo@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        avatar_img: 'uploads/examples/papelaria.jpg',
        name: 'Papelaria Leka',
        email: 'papelarialeka@mail.com',
        password: '$2a$10$NdIjKm7eeSweYG39j7c00.zzw9cdVfYietI/rpq7LLzVhly0zj1Ha',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus urna ut nunc bibendum, maximus accumsan ipsum bibendum. Curabitur in leo tortor. Etiam ut porttitor leo, ut pharetra dolor. Nam maximus convallis massa vel blandit. Pellentesque eget turpis sed magna elementum auctor nec sed orci. Integer nec gravida urna. In vitae quam diam.",
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      }
    ], {}),

    down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
