let db = require('./_db.js'),
    Sequelize = require('sequelize');

module.exports =  db.define('image', {
    name:{
      type:Sequelize.STRING
    },
    date:{
      type:Sequelize.STRING
    },
    userFacebook:{
      type:Sequelize.STRING
    },
    type:{
      type:Sequelize.ENUM('user','mistake','standard','social')
    },
    urlPath:{
      type:Sequelize.STRING
    }
})
