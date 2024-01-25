require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const config = require('./utils/config');
const ClientError = require('./exceptions/ClientError');

// users requirements
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

// authentications requirements
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

// salary requierments
const SalaryService = require('./services/postgres/SalaryService');
const SalaryValidator = require('./validator/salary');
const salary = require('./api/salary');
const AttendanceService = require('./services/postgres/AttendanceService');
const attendance = require('./api/attendance');
const AttendanceValidator = require('./validator/attendance');

const init = async () => {
  const authenticationsService = new AuthenticationsService();
  const usersService = new UsersService();
  const salaryService = new SalaryService(usersService);
  const attendanceService = new AttendanceService();

  const server = Hapi.server({
    port: config.app.port,
    host: process.env.NODE_ENV !== 'production' ? config.app.host : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Add hapi/jwt plugin
  await server.register([{ plugin: Jwt }]);

  // Authentications Strategy
  server.auth.strategy('employee_mng', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: salary,
      options: {
        service: salaryService,
        validator: SalaryValidator,
      },
    },
    {
      plugin: attendance,
      options: {
        service: attendanceService,
        validator: AttendanceValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const errorResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        errorResponse.code(response.statusCode);
        return errorResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const serverErrorResponse = h.response({
        status: 'error',
        message: 'Error, something happened to our server',
      });

      serverErrorResponse.code(500);
      return serverErrorResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
