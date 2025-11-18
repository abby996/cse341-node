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


// Generate swagger.json
swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
  console.log('Visit: http://localhost:3000/api-docs');
});