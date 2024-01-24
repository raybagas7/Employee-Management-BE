const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postNewUserHandler,
  },
];

module.exports = routes;
