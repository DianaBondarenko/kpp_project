const chatService = require('../services/chatService.js');
const mainView = require('../views/mainView.js');
const asyncHandler = require("../common/middleware/asyncHandler");

class chatController {
    getAllUsers = asyncHandler(async (req, res) => {
        const users = await chatService.getAllUsers();
        mainView.send(res, users);
    })
    getAllChats = asyncHandler(async (req, res) => {
        const chats = await chatService.getAllChats();
        mainView.send(res, chats);
    })
    getAllUserChats = asyncHandler(async (req, res) => {
        const {id} = req.params;
        const chats = await chatService.getAllUserChats(id);
        mainView.send(res, chats);
    })
    getMessagesFromChat = asyncHandler(async (req, res) => {
        //console.log(res.locals)
        const {id} = req.params;
        const chats = await chatService.getMessagesFromChat(id);
        mainView.send(res, chats);
    })
    sendMessage = asyncHandler(async (req, res) => {
        console.log('sending message')
        const {chatId, senderId, messageText} = req.body;
        const chats = await chatService.sendMessage(chatId, senderId, messageText);
        mainView.send(res, chats);
    })
}

module.exports = new chatController();
