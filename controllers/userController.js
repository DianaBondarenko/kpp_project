const userService = require('../services/userService.js');
const mainView = require('../views/mainView.js');
const asyncHandler = require("../common/middleware/asyncHandler");

class UserController {
    getUser = asyncHandler(async (req, res) => {
        console.log(res.locals)
        const {username} = res.locals.user;
        const user = await userService.getUserByUsername(username);
        mainView.send(res, user);
    })
}

module.exports = new UserController();
