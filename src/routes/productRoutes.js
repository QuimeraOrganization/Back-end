import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import loginRequired from "../middlewars/loginRequired.js";
const productRoutes = Router();
const productsController = new ProductController();
import { validateRequest } from "../validators/ProductRequestValidator.js";
import { postProductValidator } from "../validators/products/postProductValidator.js";
import { putProductValidator } from "../validators/products/putProductValidator.js";
import multer from "multer";

const Multer = multer({
  storage: multer.memoryStorage(),
});

productRoutes.post(
  "/",
  loginRequired,
  Multer.single("image"),
  validateRequest(postProductValidator),
  productsController.save
  /* 
   #swagger.summary = "Cadastro de Produto!"
   #swagger.description = "Essa rota é responsável pela criação de Produtos!"
   #swagger.tags = ['Products']

   #swagger.requestBody = {
      "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "image": {
                    "type": "string"
                  },
                  "verified": {
                    "type": "boolean"
                  },
                  "userId": {
                    "type": "integer"
                  }
                },
                "example": {
                  "name": "macarrão",
                  "description": "teste",
                  "image": "teste",
                  "verified": false,
                  "userId": 1
                }
              }
            }
          }
   }
   #swagger.responses[201] = {
      "description": "Produto cadastrado com sucesso!"
   }
   #swagger.responses[400] = {
      "description": "Verifique se os campos necessários e as atribuições no exemplo estão corretas e tente novamente!"
   }

  */
);
productRoutes.get(
  "/all",
  productsController.findAllProducts
  /* 
     #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.summary = "Busca por todos os Produtos!"
   #swagger.description = "Essa rota é responsável por buscar todos os Produtos cadastrados no banco!"
   #swagger.tags = ['Products']

  
    #swagger.responses[200] = {
      description: "Busca por todos os Produtos!",
      content:{
        "application/json": {
          example: [
            {
            "name": "macarrão",
                  "description": "gostoso",
                  "image": "teste",
                  "verified": false,
                  "userId": 1
            },
            {
             "name": "cuscuz",
             "description": "flocão",
             "image": "teste",
             "verified": false,
             "userId": 1
            }
        ]
        }
      }
        
    } 

  */
);

productRoutes.get(
  "/",
  productsController.findAll
  /* 
     #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.summary = "Busca por todos os Produtos!"
   #swagger.description = "Essa rota é responsável por buscar todos os Produtos cadastrados no banco!"
   #swagger.tags = ['Products']

  
    #swagger.responses[200] = {
      description: "Busca por todos os Produtos!",
      content:{
        "application/json": {
          example: [
            {
            "name": "macarrão",
                  "description": "gostoso",
                  "image": "teste",
                  "verified": false,
                  "userId": 1
            },
            {
             "name": "cuscuz",
             "description": "flocão",
             "image": "teste",
             "verified": false,
             "userId": 1
            }
        ]
        }
      }
        
    } 

  */
);

productRoutes.get(
  "/:id",
  productsController.findById
  /* 
     #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.summary = "Busca de Produtos pelo ID!"
   #swagger.description = "Essa rota é responsável pela busca de Produto pelo ID!"
   #swagger.tags = ['Products']

  
    #swagger.responses[200] = {
      description: "Busca de Produtos pelo ID!",
      content:{
        "application/json": {
          example: [
            {
            "name": "macarrão",
                  "description": "gostoso",
                  "image": "teste",
                  "verified": false,
                  "userId": 1
            },
            {
             "name": "cuscuz",
             "description": "flocão",
             "image": "teste",
             "verified": false,
             "userId": 1
            }
        ]
        }
      }
        
    } 

    #swagger.responses[404] = {
       "description": "Produto não encontrado!"
    }
 
    #swagger.responses[400] = {
       "description": "Solicitação Inválida"
    }

  */
);

productRoutes.put(
  "/:id",
  loginRequired,
  Multer.single("image"),
  validateRequest(putProductValidator),
  productsController.update
  /* 
  #swagger.security = [{
      "bearerAuth": []
    }]
  #swagger.summary = "Atualização de Produto!"
  #swagger.description = "Essa rota é responsável pela atualização do Produto!"
  #swagger.tags = ['Products']
  #swagger.parameters = [
    {
       "in": "path",
       "name": "id",
       "type": "string",
       "required": true
    }
  ]

  #swagger.requestBody = {
    "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "image": {
                    "type": "string"
                  },
                  "verified": {
                    "type": "boolean"
                  },
                  "userId": {
                    "type": "integer"
                  }
                },
                "example": {
                  "name": "macarrão",
                  "description": "funcionou uhuu",
                  "image": "teste",
                  "verified": false,
                  "userId": 1
                }
              }
            }
          }
  }

    #swagger.responses[200] = {
       "description": "Produto atualizado com sucesso!"
    }
    #swagger.responses[400] = {
       "description": "Solicitação Inválida!"
    }

  */
);

productRoutes.delete(
  "/:id",
  loginRequired,
  productsController.delete
  /* 
   #swagger.security = [{
      "bearerAuth": []
    }]
  #swagger.summary = "Deleta um Produto!"
  #swagger.description = "Essa rota é responsável por deletar um Produto!"
  #swagger.tags = ['Products']
  #swagger.parameters = [
    {
       "in": "path",
       "name": "id",
       "type": "string",
       "required": true
    }
  ]

  #swagger.responses[200] = {
      "description": "Produto deletado com sucesso!"
  }

  */
);

productRoutes.delete(
  "/:id/image",
  loginRequired,
  productsController.deleteProductImage
  /* 
   #swagger.security = [{
      "bearerAuth": []
    }]
  #swagger.summary = "Deleta um Produto!"
  #swagger.description = "Essa rota é responsável por deletar um Produto!"
  #swagger.tags = ['Products']
  #swagger.parameters = [
    {
       "in": "path",
       "name": "id",
       "type": "string",
       "required": true
    }
  ]

  #swagger.responses[200] = {
      "description": "Produto deletado com sucesso!"
  }

  */
);

export { productRoutes };
