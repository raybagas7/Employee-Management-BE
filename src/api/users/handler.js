const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postNewAdminHandler(request, h) {
    this._validator.validateNewAdminPayload(request.payload);

    const {
      username,
      password,
      email,
      fullname,
      birth_date,
      mobile_phone,
      place_of_birth,
      gender,
      marital_status,
      is_admin,
    } = request.payload;

    const user_id = await this._service.addNewUser({
      username,
      password,
      email,
      fullname,
      birth_date,
      mobile_phone,
      place_of_birth,
      gender,
      marital_status,
      is_admin,
    });

    const response = h.response({
      status: 'success',
      message: 'New admin has been made',
      data: {
        user_id,
      },
    });

    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
