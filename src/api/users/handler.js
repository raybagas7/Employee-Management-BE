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

    const id = await this._service.addNewUser({
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
        id,
      },
    });

    response.code(201);
    return response;
  }

  async postNewEmployeeHandler(request, h) {
    this._validator.validateNewEmployeePayload(request.payload);

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
    } = request.payload;

    const { id: ownerId } = request.auth.credentials;

    await this._service.checkIsAdmin(ownerId);

    const id = await this._service.addNewUser({
      username,
      password,
      email,
      fullname,
      birth_date,
      mobile_phone,
      place_of_birth,
      gender,
      marital_status,
    });

    const response = h.response({
      status: 'success',
      message: 'New employee account has been made',
      data: {
        id,
      },
    });

    response.code(201);
    return response;
  }

  async putEmployeeHandler(request, h) {
    this._validator.validateUpdateEmployeePayload(request.payload);

    const { id: ownerId } = request.auth.credentials;

    await this._service.checkIsAdmin(ownerId);

    const { id: employeeId } = request.payload;

    const id = await this._service.updateUser(employeeId, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Employee data updated',
      data: {
        id,
      },
    });

    response.code(201);
    return response;
  }

  async getAllEmployeeHandler(request, h) {
    const { id: ownerId } = request.auth.credentials;

    await this._service.checkIsAdmin(ownerId);

    const usersData = await this._service.getAllEmployeeData();

    const response = h.response({
      status: 'success',
      message: 'Employee data updated',
      data: {
        users: usersData,
      },
    });

    response.code(200);
    return response;
  }

  async getEmployeeHandler(request, h) {
    const { id: ownerId } = request.auth.credentials;

    const user = await this._service.getEmployeeDetail(ownerId);

    const response = h.response({
      status: 'success',
      message: 'Detail employee retrieved',
      data: {
        user,
      },
    });

    response.code(200);
    return response;
  }

  async getUserInformationById(request) {
    const { id } = request.params;
    const { id: ownerId } = request.auth.credentials;

    await this._service.checkIsAdmin(ownerId);

    const data = await this._service.getUserById(id);

    return {
      status: 'success',
      message: 'User informations retrieved',
      data: {
        user: data,
      },
    };
  }
}

module.exports = UsersHandler;
