const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/admin',
    handler: handler.postNewAdminHandler,
  },
  {
    method: 'POST',
    path: '/users',
    handler: handler.postNewEmployeeHandler,
    options: {
      auth: 'employee_mng',
    },
  },
  {
    method: 'PUT',
    path: '/users',
    handler: handler.putEmployeeHandler,
    options: {
      auth: 'employee_mng',
    },
  },
];

module.exports = routes;
