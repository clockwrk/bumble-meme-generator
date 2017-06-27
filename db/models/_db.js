console.log('im here')

let Sequelize = require('sequelize'),
    path = require('path'),
    env = require(path.join(__dirname, '../../env')),
    db = new Sequelize(env.DATABASE_URL, {
        logging: false
    });
    console.log('Made it here')

module.exports = db;
