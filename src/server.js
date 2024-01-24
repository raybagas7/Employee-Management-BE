require('dotenv').config();
const Hapi = require('@hapi/hapi');
const config = require('./utils/config');

const init = async () => {
  const server = Hapi.server({
    port: config.app.port,
    host: process.env.NODE_ENV !== 'production' ? config.app.host : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
