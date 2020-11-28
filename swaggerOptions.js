module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight Diary',
      version: '0.1.0',
      description: 'Flight Diary API',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Zdenek Pasek',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};
