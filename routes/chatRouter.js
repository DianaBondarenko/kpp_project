const express = require('express');
const chatController = require('../controllers/chatController.js');

const chatRouter = express.Router();

chatRouter.get('/users', chatController.getAllUsers);
chatRouter.get('/chats', chatController.getAllChats);
chatRouter.get('/chats/:id', chatController.getAllUserChats);
chatRouter.get('/messages/:id', chatController.getMessagesFromChat);
chatRouter.post('/messages/:id', chatController.sendMessage);
// adminRouter.patch('/orders/:id', adminController.changeOrderStatus);
// adminRouter.get('/orders', adminController.getAllOrders);

module.exports = chatRouter;
