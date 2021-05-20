const express = require('express');
const chatController = require('../controllers/chatController.js');

const chatRouter = express.Router();

chatRouter.get('/users', chatController.getAllUsers);
chatRouter.get('/chats', chatController.getAllChats);
chatRouter.get('/chats/:id', chatController.getAllUserChats);
chatRouter.get('/messages/:id', chatController.getMessagesFromChat);
chatRouter.post('/messages/:id', chatController.sendMessage);

module.exports = chatRouter;
