const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 API',
    description: 'Complete REST API with Items and Users collections',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  basePath: '/api',
  tags: [
    {
      name: 'Items',
      description: 'Item management endpoints'
    },
    {
      name: 'Users', 
      description: 'User management endpoints'
    }
  ]
};

const outputFile = './swagger-output.json';
const routes = ['./routes/items.js', './routes/users.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('Swagger documentation generated!');
});