const express = require('express');
const userController = require('../controllers/userController.js');

const chatRouter = express.Router();

chatRouter.get('/', userController.getUser);

module.exports = chatRouter;
