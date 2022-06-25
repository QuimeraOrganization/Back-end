import { Router } from "express";

import loginRequired from "../middlewars/loginRequired.js";

import { CategoryController } from "../controllers/CategoryController.js";

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post(
  "/",
  categoryController.save
  /* 
   #swagger.summary = "Cadastro de Categorias!"
    #swagger.description = "Essa rota é responsável pelo cadastro de Categorias!"
    #swagger.tags = ['Categories']
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
                  "name": "Salgados"    
                }
              }
            }
          }
    }
    #swagger.responses[201] = {
       "description": "Categoria cadastrado com sucesso!",
    }
    #swagger.responses[400] = {
      "description": "Essa Categoria já existe!"
    }
  */
);

categoryRoutes.get(
  "/",
  loginRequired,
  categoryController.findAll
  /* 
    #swagger.summary = "Busca por todas as Categorias!"
    #swagger.description = "Essa rota é responsável por buscar todas as Categorias cadastradas no banco!"
    #swagger.tags = ['Categories']
     #swagger.security = [{
      "bearerAuth": []
    }]

    #swagger.responses[200] = {
      description: "Busca por todas as Categorias!",
      content:{
        "application/json": {
          example: [
            {
              "name": "Salgados",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },
           
        ]
        }
      }
        
    } 
  */
);

categoryRoutes.get(
  "/:id",
  loginRequired,
  categoryController.findById
  /* 
      #swagger.summary = "Busca de Categorias pelo ID!"
    #swagger.description = "Essa rota é responsável por buscar Categoria pelo ID!"
    #swagger.tags = ['Categories']
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
      description: "Busca de Categorias pelo ID!",
      content:{
        "application/json": {
          example: [
            {
              "name": "Salgados",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },
          ]
        }
      }     
    } 
  */
);

categoryRoutes.put(
  "/:id",
  loginRequired,
  categoryController.update
  /* 
   #swagger.summary = "Atualização de Categoria!"
    #swagger.description = "Essa rota é responsável pela atualização de uma Categoria!"
    #swagger.tags = ['Categories']
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
                  "name": "Salgados"    
                }
              }
            }
          }
    }
     #swagger.responses[404] = {
      "description": "Categoria não encontrada."
    }
    #swagger.responses[500] = {
      "description": "Erro interno!"
    }
    #swagger.responses[200] = {
      "description": "Categoria atualizada com sucesso!"
    }
  */
);

categoryRoutes.delete(
  "/:id",
  loginRequired,
  categoryController.delete
  /* 
     #swagger.summary = "Deleta uma categoria!"
    #swagger.description = "Essa rota é responsável por deletar uma Categoria!
    #swagger.tags = ['Categories']
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
       "description": "Categoria deletada com sucesso!"
    }
    #swagger.responses[404] = {
      "description" : "Categoria não encontrada!"
    }
    #swagger.responses[500] = {
       "description": "Erro interno!"
    }
  */
);

export { categoryRoutes };
