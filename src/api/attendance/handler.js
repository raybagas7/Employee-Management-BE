const autoBind = require('auto-bind');

class AttendanceHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAttendanceHandler(request, h) {
    this._validator.validatePostAttendancePayload(request.payload);

    const { id: ownerId } = request.auth.credentials;

    const { status } = request.payload;

    await this._service.postEmployeeAttendance(ownerId, status);

    const response = h.response({
      status: 'success',
      message: `Attendance ${status} recorded`,
    });

    response.code(201);
    return response;
  }
}

module.exports = AttendanceHandler;
