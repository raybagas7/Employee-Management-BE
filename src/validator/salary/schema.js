const Joi = require('joi');

const PostSalaryPayloadSchema = Joi.object({
  owner: Joi.string().required(),
  salary: Joi.number().integer().required(),
  role: Joi.string().required(),
});

module.exports = {
  PostSalaryPayloadSchema,
};
