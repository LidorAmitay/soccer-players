const Joi = require('joi');

module.exports.playerSchema = Joi.object({
    player: Joi.object({
        name: Joi.string().required(),
        team: Joi.string().required(),
        age:Joi.number().required().min(16),
        role:Joi.string().required(),
        position: Joi.string().required(),
        jersey: Joi.number().min(1).max(99).required()
    }).required()
});