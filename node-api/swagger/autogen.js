const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: 'Items API',
    description: 'API documentation'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);
