const autoBind = require('auto-bind');

class SalaryHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSalaryHandler(request, h) {
    this._validator.validatePostSalaryPayload(request.payload);

    const { id: adminId } = request.auth.credentials;

    const { owner, salary, role } = request.payload;

    await this._service.addSalaryForEmployee(adminId, owner, salary, role);

    const response = h.response({
      status: 'success',
      message: 'New salary has been made',
    });

    response.code(201);
    return response;
  }
}

module.exports = SalaryHandler;
