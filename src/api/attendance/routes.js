const routes = (handler) => [
  {
    method: 'POST',
    path: '/attendance',
    handler: handler.postAttendanceHandler,
    options: {
      auth: 'employee_mng',
    },
  },
];

module.exports = routes;
