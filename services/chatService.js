const NotFound = require('../common/errors/notFound');
// const Product = require('../models/productModel.js');
// const Category = require('../models/categoryModel.js');
// const Manufacture = require('../models/manufactureModel.js');
// const Unit = require('../models/unitModel.js');
// const {Sequelize, Op} = require("sequelize");
const pool = require('../pool.js');

class ChatService {
    async getAllUsers() {
        const {rows} = await pool.query(`SELECT * FROM users;`);
        if (rows.length > 0) return rows;
        throw new NotFound('Users are not found');
    }
    async getAllChats() {
        const {rows} = await pool.query(`SELECT * FROM chats;`);
        if (rows.length > 0) return rows;
        throw new NotFound('Chats are not found');
    }
    async getAllUserChats(userId) {
        const {rows} = await pool.query(`SELECT * FROM chats JOIN chats_users ON chats.id=chats_users.chat_id
        JOIN users ON chats_users.user_id=users.id  WHERE chats_users.user_id=${userId};`);
        if (rows.length > 0) return rows;
        throw new NotFound('Chat is not found');
    }
    async getMessagesFromChat(chatId) {
        const {rows} = await pool.query(`SELECT * FROM chats JOIN messages ON messages.chat_id=chats.id
        JOIN users ON messages.sender_id=users.id WHERE chats.id=${chatId};`);
        if (rows.length > 0) return rows;
        throw new NotFound('Chat is not found');
    }
    async sendMessage(chatId, userId, messageText) {
        const {rows} = await pool.query(`INSERT INTO messages (chat_id, sender_id, text) 
        VALUES (${chatId}, ${userId}, '${messageText}');`);
        console.log(rows) //.length > 0) return rows;
        //throw new NotFound('Chat is not found');
    }

}

module.exports = new ChatService();
