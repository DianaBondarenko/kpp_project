const Joi = require('joi');

const authDTO = Joi.object().keys({
    username: Joi.string().max(50).required(),
    password: Joi.string().min(6).max(50).required()
});

module.exports = authDTO;
