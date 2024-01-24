const InvariantError = require('../../exceptions/InvariantError');
const { NewEmployeePayloadSchema, NewAdminPayloadSchema } = require('./schema');

const UsersValidator = {
  validateNewEmployeePayload: (payload) => {
    const validationResult = NewEmployeePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateNewAdminPayload: (payload) => {
    const validationResult = NewAdminPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
