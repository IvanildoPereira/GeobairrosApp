require('dotenv/config');

module.exports = {
    dialect: process.env.DIALECTDB,
    host: process.env.DBHOST || "127.0.0.1",
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    define:{
        timestamps: true,
        underscored: true
    }
}