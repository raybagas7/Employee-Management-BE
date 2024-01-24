require('dotenv').config();
const Hapi = require('@hapi/hapi');
const config = require('./utils/config');
const ClientError = require('./exceptions/ClientError');
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const userService = new UsersService();

  const server = Hapi.server({
    port: config.app.port,
    host: process.env.NODE_ENV !== 'production' ? config.app.host : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: userService,
        validator: UsersValidator,
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
