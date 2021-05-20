const userService = require('../../services/userService.js');
const NotFound = require('../errors/notFound.js');
const Forbidden = require('../errors/forbidden.js');

const authMiddleWare = async (req, res, next) => {
    const {username, password} = req.headers;
    const user = await userService.getUserByUsername(username);
    if (user) {
        if (user.password === password) {
            res.locals.user = user;
            res.locals.isAuthenticated = true;
            next();
        } else {
            res.locals.isAuthenticated = false;
            next(new Forbidden(`User's password is wrong`));
        }
    }
    else {
        res.locals.isAuthenticated = false;
        next(new NotFound('This user doesn\'t exist'));
    }
}
module.exports = authMiddleWare;
