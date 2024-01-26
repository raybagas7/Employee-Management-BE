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
  {
    method: 'GET',
    path: '/users',
    handler: handler.getAllEmployeeHandler,
    options: {
      auth: 'employee_mng',
    },
  },
  {
    method: 'GET',
    path: '/users/detail',
    handler: handler.getEmployeeHandler,
    options: {
      auth: 'employee_mng',
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserInformationById,
  },
];

module.exports = routes;
