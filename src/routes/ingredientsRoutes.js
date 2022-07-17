import { Router } from "express";
import { IngredientsController } from "../controllers/IngredientsController.js";
import loginRequired from "../middlewars/loginRequired.js";
const ingredientsController = new IngredientsController();
const ingredientsRoutes = Router();

import { validateRequest } from "../validators/RequestValidator.js";
import { postIngredientsValidator } from "../validators/ingredients/postIngredientsValidator.js";
import { putIngredientsValidator } from "../validators/ingredients/putIngredientsValidator.js";

ingredientsRoutes.post(
  "/",
  validateRequest(postIngredientsValidator),
  ingredientsController.save
  /* 
   #swagger.summary = "Cadastro de Ingrediente!"
   #swagger.description = "Essa rota é responsável pelo cadastro de Ingredientes!"
   #swagger.tags = ['Ingredients']
   #swagger.requestBody = {
       required: true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  }
                },
                "example": {
                  "name": "Oléo de soja"
                }
              }
            }
          }
   }

   #swagger.responses[201] = {
     "description": "Ingrediente cadastrado com sucesso!"
   }

  */
);

ingredientsRoutes.get(
  "/",
  ingredientsController.findAll
  /* 
   #swagger.summary = "Busca por todos os Ingredientes!"
   #swagger.description = "Essa rota é responsável por buscar todos os Ingredientes cadastrados no banco!"
   #swagger.tags = ['Ingredients']
  
    #swagger.security = [{
      "bearerAuth": []
    }]
   #swagger.responses[200] = {
      description: "Busca por todos os Ingredientes!",
      content:{
        "application/json": {
          example: [
            {
              "name": "Feijão",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },
            {
              "name": "leite de cabra",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            }
        ]
        }
      }
        
    } 
  */
);

ingredientsRoutes.get(
  "/:id",
  ingredientsController.findById
  /* 
   #swagger.summary = "Busca de Ingredientes pelo ID!"
   #swagger.description = "Essa rota é responsável por buscar Ingrediente pelo ID!"
   #swagger.tags = ['Ingredients']
  
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.parameters = [
      {
            "in": "path",
            "name": "id",
            "type": "string",
            "required": true
      }
    ]

    #swagger.responses[200] = {
      description: "Busca por todos os Ingredientes!",
      content:{
        "application/json": {
          example: [
            {
              "name": "Feijão",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },
            {
              "name": "leite de cabra",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            }
        ]
        }
      }
        
    } 
     #swagger.responses[404] = {
       "description": "Ingrediente não encontrado."
    }

    #swagger.responses[500] = {
       "description": "Erro interno!"
    }

  */
);

ingredientsRoutes.put(
  "/:id",
  loginRequired,
  validateRequest(putIngredientsValidator),
  ingredientsController.update
  /* 
   #swagger.summary = "Atualização de Ingredientes!"
   #swagger.description = "Essa rota é responsável pela atualização do Ingrediente!"
   #swagger.tags = ['Ingredients']
   #swagger.security = [{
      "bearerAuth": []
    }]
     #swagger.requestBody = {
       required: true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  }
                },
                "example": {
                  "name": "Oléo de soja"
                }
              }
            }
          }
   }
    #swagger.responses[404] = {
      "description": "Ingrediente não encontrado."
    }
    #swagger.responses[500] = {
      "description": "Erro interno!"
    }
    #swagger.responses[200] = {
      "description": "Ingrediente atualizado com sucesso!"
    }
  */
);

ingredientsRoutes.delete(
  "/:id",
  loginRequired,
  ingredientsController.delete
  /* 
   #swagger.summary = "Deletar um Ingrediente!"
   #swagger.description = "Essa rota é responsável por deletar um Ingrediente!"
   #swagger.tags = ['Ingredients']
   #swagger.security = [{
      "bearerAuth": []
    }]
      #swagger.parameters = [
      {
        "in": "path",
        "name": "id",
        "type": "string",
        "required": true
      }
    ]

    #swagger.responses[200] = {
       "description": "Ingrediente deletado com sucesso!"
    }
    #swagger.responses[404] = {
      "description": "Ingrediente não encontrado!"
    }
    #swagger.responses[500] = {
       "description": "Erro interno!"
    }
  */
);

export { ingredientsRoutes };
