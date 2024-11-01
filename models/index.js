const Sequelize = require('sequelize');
const sequelize = require('../config/dataBase');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importer les modèles
db.User = require('./user_model')(sequelize , Sequelize);


module.exports = db ;