'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('user_followers',
    [
      {
        user_id: 1,
        follower_id: 1,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 2,
        follower_id: 2,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 3,
        follower_id: 3,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 4,
        follower_id: 4,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 5,
        follower_id: 5,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 6,
        follower_id: 6,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 7,
        follower_id: 7,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 8,
        follower_id: 8,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 9,
        follower_id: 9,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 10,
        follower_id: 10,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 11,
        follower_id: 11,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 12,
        follower_id: 12,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },

      {
        user_id: 13,
        follower_id: 13,
        created_at: "2020-08-16 19:45:22",
        updated_at: "2020-08-16 19:45:22"
      },
    ], {}),

    down: (queryInterface) => queryInterface.bulkDelete('user_followers', null, {}),
};
