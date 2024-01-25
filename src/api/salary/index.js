const SalaryHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'salary',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const salaryHandler = new SalaryHandler(service, validator);
    server.route(routes(salaryHandler));
  },
};
