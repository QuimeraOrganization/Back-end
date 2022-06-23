import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const outputFile = "./swagger.json";
const endpointsFile = ['./src/routes/router.js'];

const doc = {
  info: {
    title: 'Quimera API',
    description: 'API do sistema desenvolvido no bootcamp do Atlântico Academy',
  },
  host: 'localhost:3333',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  definitions: {
    Product: {
      id: 1,
      name: "Produto teste 1",
      description: "Teste de cadastro",
      image: "products/1/image.jpg",
      verified: false,
      userId: 1,
      brandId: 1,
      created_at: "2022-06-19T02:00:13.930Z",
      updated_at: "2022-06-19T02:00:13.930Z"
    },
    User: {
      id: 1,
      email: "email@example.com",
      permission: "USER",
      created_at: "2022-06-18T14:04:38.614Z",
      updated_at: "2022-06-19T01:57:29.794Z"
    },
    Feedback: {
      id: 1,
      contents: "Produto muito bom",
      userId: 1,
      productId: 1,
      created_at: "2022-06-18T14:04:38.614Z",
      updated_at: "2022-06-19T01:57:29.794Z"
    },
    Brand: {
      id: 1,
      name: "Marca tal",
      created_at: "2022-06-18T14:04:38.614Z",
      updated_at: "2022-06-19T01:57:29.794Z"
    },
    Ingredient: {
      id: 1,
      name: "Ingrediente tal",
      created_at: "2022-06-18T14:04:38.614Z",
      updated_at: "2022-06-19T01:57:29.794Z"
    },
    Category: {
      id: 1,
      name: "Categoria tal",
      created_at: "2022-06-18T14:04:38.614Z",
      updated_at: "2022-06-19T01:57:29.794Z"
    }
  }
};

swaggerAutogen(outputFile, endpointsFile, doc).then(async () => {
  await import("./src/serve.js");
});