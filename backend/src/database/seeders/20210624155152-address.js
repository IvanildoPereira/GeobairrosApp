'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('addresses',
    [
      {
        fachada_img: 'uploads/examples/igreja.jpeg',
        logradouro: 'Estrada Canal do Cocaia N° 2905',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73414',
        longitude: '-46.66387',
        user_id: 1,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/cabelereiro_1.jpg',
        logradouro: 'Rua Santo André N° 455',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73509',
        longitude: '-46.66259',
        user_id: 2,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: null,
        logradouro: 'Rua São Lucas',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73627',
        longitude: '-46.66529',
        user_id: 3,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/casa_1.jpg',
        logradouro: 'Rua São Caetano',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73551',
        longitude: '-46.66193',
        user_id: 4,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/casa_2.jpg',
        logradouro: 'Rua da Paz',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73428',
        longitude: '-46.66047',
        user_id: 5,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/barze.jpg',
        logradouro: 'Rua das Flores',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73388',
        longitude: '-46.65984',
        user_id: 6,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/barchico.jpg',
        logradouro: 'Avenida São Paulo',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73395',
        longitude: '-46.66073',
        user_id: 7,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/padaria.jpg',
        logradouro: 'Avenida São Paulo',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73477',
        longitude: '-46.66262',
        user_id: 8,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/mercadinho.jpg',
        logradouro: 'Avenida São Paulo',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73468',
        longitude: '-46.66376',
        user_id: 9,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/contrucao.jpg',
        logradouro: 'Rua São João',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73545',
        longitude: '-46.66359',
        user_id: 10,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/acougue.jpg',
        logradouro: 'Rua Nove de Setembro',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73398',
        longitude: '-46.66153',
        user_id: 11,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },
      
      {
        fachada_img: 'uploads/examples/farmacia.jpg',
        logradouro: 'Rua Charles Rosen',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73392',
        longitude: '-46.66588',
        user_id: 12,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        fachada_img: 'uploads/examples/papelaria.jpg',
        logradouro: 'Rua Bartolomeu Bezzi',
        bairro: 'Jardim Gaivotas',
        cidade: 'São Paulo',
        uf: 'SP',
        latitude: '-23.73325',
        longitude: '-46.66494',
        user_id: 13,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      }
      
    ], {}),

    down: (queryInterface) => queryInterface.bulkDelete('addresses', null, {}),
};
