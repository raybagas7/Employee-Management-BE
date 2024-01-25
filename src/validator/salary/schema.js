const Joi = require('joi');

const PostSalaryPayloadSchema = Joi.object({
  owner: Joi.string().required(),
  salary: Joi.number().integer().required(),
  role: Joi.string().required(),
});

const UpdateSalaryPayloadSchema = Joi.object({
  owner: Joi.string().required(),
  salary: Joi.number().integer(),
  role: Joi.string(),
});

module.exports = {
  PostSalaryPayloadSchema,
  UpdateSalaryPayloadSchema,
};
