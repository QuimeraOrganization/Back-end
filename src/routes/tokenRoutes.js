import { Router } from "express";
import { TokenController } from "../controllers/tokenController/TokenController.js";

const tokenRoutes = Router();
const tokenController = new TokenController();

tokenRoutes.post(
  "/",
  tokenController.handle
  /* 
   #swagger.summary = "Criando token para autenticação do Usuário!"
    #swagger.description = "Essa rota é responsável pela criação do Token para o Usuário conseguir se autenticar!"
    #swagger.tags = ['Authentication']
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
      "description": "Token gerado com sucesso!"
    }
   

  */
);

export { tokenRoutes };
