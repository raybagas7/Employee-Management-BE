const AttendanceHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'attendance',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const attendanceHandler = new AttendanceHandler(service, validator);
    server.route(routes(attendanceHandler));
  },
};
