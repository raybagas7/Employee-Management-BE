const routes = (handler) => [
  {
    method: 'POST',
    path: '/salary/employee',
    handler: handler.postSalaryHandler,
    options: {
      auth: 'employee_mng',
    },
  },
];

module.exports = routes;
