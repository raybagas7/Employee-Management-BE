const routes = (handler) => [
  //   {
  //     method: 'POST',
  //     path: '/users',
  //     handler: handler.postNewEmployeeHandler,
  //   },
  {
    method: 'POST',
    path: '/users/admin',
    handler: handler.postNewAdminHandler,
  },
];

module.exports = routes;
