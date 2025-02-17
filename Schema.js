const Joi = require('joi');

module.exports.listningSchema =  Joi.object({
    listing : Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        price:Joi.number().required().min(0),
        country:Joi.string().required(),
        image:Joi.string().allow("",null)
    }).required()
    
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required(),
        Comment:Joi.string().required()
    }).required()
})