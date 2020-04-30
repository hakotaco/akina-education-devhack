const sequelize = require("sequelize");
const db = require("../config/connection");

const User = db.define('users', {
    name: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    phone: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize.STRING
    },
    verified: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    }
});

User.sync({alter: true})
    .then(() => {
        console.log("Table created");
    })
    .catch(err => {
        console.log(err);
    });
module.exports = User;