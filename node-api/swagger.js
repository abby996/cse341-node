const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 API',
    description: 'Complete REST API with Items and Users collections',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@api.com'
    }
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
  ],
  definitions: {
    Item: {
      type: 'object',
      required: ['name', 'description', 'price', 'category'],
      properties: {
        _id: {
          type: 'string',
          description: 'Auto-generated item ID'
        },
        name: {
          type: 'string',
          description: 'Item name',
          example: 'Laptop',
          minLength: 2,
          maxLength: 50
        },
        description: {
          type: 'string',
          description: 'Item description',
          example: 'High-performance laptop for development',
          minLength: 10,
          maxLength: 500
        },
        price: {
          type: 'number',
          description: 'Item price',
          example: 999.99,
          minimum: 0
        },
        category: {
          type: 'string',
          enum: ['electronics', 'clothing', 'books', 'home', 'other'],
          example: 'electronics'
        },
        inStock: {
          type: 'boolean',
          example: true
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    },
    User: {
      type: 'object',
      required: ['firstName', 'lastName', 'email'],
      properties: {
        _id: {
          type: 'string',
          description: 'Auto-generated user ID'
        },
        firstName: {
          type: 'string',
          description: 'User first name',
          example: 'John',
          minLength: 1,
          maxLength: 50
        },
        lastName: {
          type: 'string',
          description: 'User last name',
          example: 'Doe',
          minLength: 1,
          maxLength: 50
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'User email address',
          example: 'john.doe@example.com'
        },
        role: {
          type: 'string',
          enum: ['customer', 'admin', 'vendor'],
          example: 'customer'
        },
        isActive: {
          type: 'boolean',
          example: true
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    },
    Error: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        message: {
          type: 'string',
          example: 'Error message'
        },
        error: {
          type: 'string',
          example: 'Detailed error description'
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./routes/items.js', './routes/users.js']; // ⬅️ AJOUTE users.js

// Generate swagger.json
swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
  console.log('Visit: http://localhost:3000/api-docs');
});