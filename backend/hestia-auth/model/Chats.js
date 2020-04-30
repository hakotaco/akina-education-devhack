const sequelize = require("sequelize");
const db = require("../config/connection");

const Chats = db.define('chats', {
    receiver: {
        type: sequelize.INTEGER
    },
    sender: {
        type: sequelize.INTEGER
    },
    request_receiver: {
        type: sequelize.INTEGER
    },
    request_sender: {
        type: sequelize.INTEGER
    },
    title: {
        type: sequelize.TEXT
    },
    sender_name: {
        type: sequelize.TEXT
    },
    receiver_name: {
        type: sequelize.TEXT
    }
}, {timestamps: false});

module.exports = Chats;