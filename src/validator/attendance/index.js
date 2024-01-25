const InvariantError = require('../../exceptions/InvariantError');
const { PostAttendancePayloadSchema } = require('./schema');

const AttendanceValidator = {
  validatePostAttendancePayload: (payload) => {
    const validationResult = PostAttendancePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AttendanceValidator;
