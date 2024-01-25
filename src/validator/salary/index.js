const InvariantError = require('../../exceptions/InvariantError');
const { PostSalaryPayloadSchema } = require('./schema');

const SalaryValidator = {
  validatePostSalaryPayload: (payload) => {
    const validationResult = PostSalaryPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SalaryValidator;
