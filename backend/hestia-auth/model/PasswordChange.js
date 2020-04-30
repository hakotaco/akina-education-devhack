const sequelize = require("sequelize");
const db = require("../config/connection");

const PasswordChange = db.define('passwordchange', {
    email: {
        type: sequelize.STRING
    },
    token: {
        type: sequelize.STRING
    }
}, {freezeTableName: true});

PasswordChange.sync({alter: true})
    .then(() => {
        console.log("Table Created");
    })
    .catch(err => {
        console.log(err);
    });

module.exports = PasswordChange;