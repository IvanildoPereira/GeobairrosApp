const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Address = require('../models/Address');
const Product = require('../models/Product')
const Image = require('../models/Image');
const UserFollower = require('../models/UserFollower')


const connection = new Sequelize(dbConfig);

User.init(connection);
UserFollower.init(connection);
Address.init(connection);
Product.init(connection);
Image.init(connection);


User.associate(connection.models);
Address.associate(connection.models);
Product.associate(connection.models);
Image.associate(connection.models);
UserFollower.associate(connection.models);

module.exports = connection;