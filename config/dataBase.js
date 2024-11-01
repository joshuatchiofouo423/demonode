const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('demonode', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;