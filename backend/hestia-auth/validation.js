const Joi = require("@hapi/joi");

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required().max(100),
        email: Joi.string().email().required(),
        phone: Joi.string().required().max(10).min(10),
        password: Joi.string().required().min(8)
    });
    return schema.validate(data);
};
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8)
    });
    return schema.validate(data);
};

const updateValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required().max(100),
        email: Joi.string().email().required(),
        phone: Joi.string().required().max(10).min(10)
    });
    return schema.validate(data);
};

const changePasswordValidation = data =>{
    const schema = Joi.object({
       password: Joi.string().required().min(8)
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
module.exports.changePasswordValidation = changePasswordValidation;