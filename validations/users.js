const Joi = require("joi");
const roles = require("../db/enum/role.enum");

const register = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.keys(roles))
    .required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  middleName: Joi.string(),
  age: Joi.string(),
  country: Joi.string(),
  mobile: Joi.string(),
});

module.exports = {
  register,
};
