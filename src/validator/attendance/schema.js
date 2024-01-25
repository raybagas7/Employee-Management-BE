const Joi = require('joi');

const PostAttendancePayloadSchema = Joi.object({
  status: Joi.string().valid('in', 'out').required(),
});

module.exports = { PostAttendancePayloadSchema };
