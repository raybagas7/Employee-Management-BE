const routes = (handler) => [
  {
    method: 'POST',
    path: '/salary/employee',
    handler: handler.postSalaryHandler,
    options: {
      auth: 'employee_mng',
    },
  },
  {
    method: 'PUT',
    path: '/salary/employee',
    handler: handler.putSalaryHandler,
    options: {
      auth: 'employee_mng',
    },
  },
  {
    method: 'DELETE',
    path: '/salary/employee',
    handler: handler.deleteSalaryHandler,
    options: {
      auth: 'employee_mng',
    },
  },
];

module.exports = routes;
