const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string().min(5).max(25).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string()
    .email({
      tlds: true,
    })
    .required(),
  fullname: Joi.string().min(2).required(),
  birth_date: Joi.string().required(),
  mobile_phone: Joi.number().integer().required(),
  place_of_birth: Joi.string().required(),
  gender: Joi.string().required(),
  marital_status: Joi.string().required(),
});

module.exports = {
  UserPayloadSchema,
};
