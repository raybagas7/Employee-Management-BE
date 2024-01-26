const routes = (handler) => [
  {
    method: 'POST',
    path: '/attendance',
    handler: handler.postAttendanceHandler,
    options: {
      auth: 'employee_mng',
    },
  },
  {
    method: 'GET',
    path: '/attendance/me',
    handler: handler.getAttendanceWithTokenHandler,
    options: {
      auth: 'employee_mng',
    },
  },
];

module.exports = routes;
