import { Router } from "express";
import { UsersController } from "../controllers/UserController.js";
import loginRequired from "../middlewars/loginRequired.js";
import adminRequired from "../middlewars/adminRequired.js";
const userRoutes = Router();
const usersController = new UsersController();
import { validateRequest } from "../validators/RequestValidator.js";
import { postUserValidator } from "../validators/users/postUserValidator.js";
import { putUserValidator } from "../validators/users/putUserValidator.js";

userRoutes.post(
  "/",
  validateRequest(postUserValidator),
  usersController.createUser
  /* 
    #swagger.summary = "Cadastro de Usuários!"
    #swagger.description = "Essa rota é responsável pela criação de Usuários!"
    #swagger.tags = ['Users']
    #swagger.requestBody = {
      required: true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  },
                  "permission": {
                    "type": "string"
                  }
                },
                "example": {
                  "email": "pedro_oliverira@gmail.com",
                  "password": "13456"
                }
              }
            }
          }
    }
    #swagger.responses[201] = {
       "description": "Usuário cadastrado com sucesso!",
    }
    #swagger.responses[400] = {
      "description": "Esse Usuário já existe!"
    }
  */
);

userRoutes.get(
  "/",
  usersController.findAllUsers
  /* 
    #swagger.summary = "Busca por todos os Usuários!"
    #swagger.description = "Essa rota é responsável por buscar todos os Usuários cadastrados no banco!"
    #swagger.tags = ['Users']

    #swagger.security = [{
      "bearerAuth": []
    }]

    #swagger.responses[200] = {
      description: "Busca todos os usuários",
      content:{
        "application/json": {
          example: [
            {
              "id": 1,
              email: "email@gmail.com",
              permission: "USER",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },
            {
              "id": 2,
              email: "email2@gmail.com",
              permission: "USER",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            }
        ]
        }
      }
        
    } 

  */
);

userRoutes.get(
  "/:id",
  loginRequired,
  usersController.findUser
  /* 
   
    #swagger.summary = "Busca de Usuários pelo ID!"
    #swagger.description = "Essa rota é responsável por buscar Usuário pelo ID!"
    #swagger.tags = ['Users']
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
      description: "Busca de Usuários pelo ID!",
      content:{
        "application/json": {
          example: [
            {
              "id": 1,
              email: "email@gmail.com",
              permission: "USER",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },
            {
              "id": 2,
              email: "email2@gmail.com",
              permission: "USER",
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            }
        ]
        }
      }
        
    } 

    #swagger.responses[404] = {
       "description": "Usuário não encontrado."
    }

    #swagger.responses[500] = {
       "description": "Erro interno!"
    }

  */
);

userRoutes.put(
  "/:id",
  loginRequired,
  adminRequired,
  validateRequest(putUserValidator),
  usersController.updateUser
  /* 
     #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.summary = "Atualização de Usuário!"
    #swagger.description = "Essa rota é responsável pela atualização do Usuário!"
    #swagger.tags = ['Users']
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
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  },
                  "permission": {
                    "type": "string"
                  }
                },
                "example": {
                  "email": "pedro_oliverira@gmail.com",
                  "password": "13456"
                }
              }
            }
          }
    }

    #swagger.responses[404] = {
      "description": "Usuário não encontrado."
    }
    #swagger.responses[500] = {
      "description": "Email deste usuário está invalido!"
    }
    #swagger.responses[200] = {
      "description": "Usuário atualizado com sucesso!"
    }
  */
);

userRoutes.delete(
  "/:id",
  loginRequired,
  adminRequired,
  usersController.deleteUser
  /* 
   #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.summary = "Deleta um Usuário!"
    #swagger.description = "Essa rota é responsável por deletar um Usuário!"
    #swagger.tags = ['Users']
    #swagger.parameters = [
      {
        "in": "path",
        "name": "id",
        "type": "string",
        "required": true
      }
    ]

    #swagger.responses[200] = {
       "description": "Usuário deletado com sucesso!"
    }
    #swagger.responses[500] = {
       "description": "Erro interno!"
    }
  */
);

export { userRoutes };
