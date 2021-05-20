const NotFound = require('../common/errors/notFound');
// const Product = require('../models/productModel.js');
// const Category = require('../models/categoryModel.js');
// const Manufacture = require('../models/manufactureModel.js');
// const Unit = require('../models/unitModel.js');
// const {Sequelize, Op} = require("sequelize");
const pool = require('../pool.js');

class UserService {
    async getUserByUsername(username) {
        const {rows} = await pool.query(`SELECT * FROM users WHERE username='${username}';`);
        if (rows.length > 0) return rows[0];
        throw new NotFound('User is not found');
    }
}

module.exports = new UserService();
