const InvariantError = require('../../exceptions/InvariantError');
const {
  PostSalaryPayloadSchema,
  UpdateSalaryPayloadSchema,
  DeleteSalaryPayloadSchema,
} = require('./schema');

const SalaryValidator = {
  validatePostSalaryPayload: (payload) => {
    const validationResult = PostSalaryPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutSalaryPayload: (payload) => {
    const validationResult = UpdateSalaryPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateDeleteSalaryPayload: (payload) => {
    const validationResult = DeleteSalaryPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SalaryValidator;
