import { Router } from "express";
import { FeedbackController } from "../controllers/FeedbackController.js";
import loginRequired from "../middlewars/loginRequired.js";
const feedbackRoutes = Router();
const feedbacksController = new FeedbackController();
import { validateRequest } from "../validators/RequestValidator.js";
import { postFeedbackValidator } from "../validators/feedbacks/postFeedbackValidator.js";
import { putFeedbackValidator } from "../validators/feedbacks/putFeedbackValidator.js";

feedbackRoutes.post(
  "/",
  validateRequest(postFeedbackValidator),
  feedbacksController.createFeedback
  /* 
   #swagger.summary = "Cadastro de Feedbacks!"
    #swagger.description = "Essa rota é responsável pelo cadastro de Feedbacks!"
    #swagger.tags = ['Feedbacks']
    #swagger.requestBody = {
      required: true,
         "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "contents": {
                    "type": "string"
                  },
                  "productId": {
                    "type": "integer"
                  },
                  "userId": {
                    "type": "integer"
                  }
                },
                "example": {
                  "contents": "Esse produto contém açúcar",
                  "productId": 1,
                  "userId": 2
                }
              }
            }
          }
    }
    #swagger.responses[201] = {
       "description": "Feedback cadastrado com sucesso!",
    }
    #swagger.responses[400] = {
       "description": "Verifique se os campos necessários e as atribuições no exemplo estão corretas e tente novamente!"
    }
  */
);

feedbackRoutes.get(
  "/",
  loginRequired,
  feedbacksController.findAllFeedbacks
  /* 
    #swagger.summary = "Busca por todos os Feedbacks!"
    #swagger.description = "Essa rota é responsável por buscar todos os Feedbacks cadastrados no banco!"
    #swagger.tags = ['Feedbacks']
     #swagger.responses[200] = {
      description: "Busca todos os usuários",
      content:{
        "application/json": {
          example: [
            {
              "contents": "Esse produto contém açúcar",
              "productId": 1,
              "userId": 2,
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },          
         ]
        }
      }      
    } 
  */
);

feedbackRoutes.get(
  "/:id",
  loginRequired,
  feedbacksController.findFeedback
  /* 
     #swagger.summary = "Busca de Feedbacks pelo ID!"
    #swagger.description = "Essa rota é responsável por buscar Feedback pelo ID!"
    #swagger.tags = ['Feedbacks']
     #swagger.responses[200] = {
      description: "Busca de Feedbacks pelo ID!",
      content:{
        "application/json": {
          example: [
            {
              "contents": "Esse produto contém açúcar",
              "productId": 1,
              "userId": 2,
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },          
         ]
        }
      }      
    } 
  */
);

feedbackRoutes.put(
  "/:id",
  loginRequired,
  validateRequest(putFeedbackValidator),
  feedbacksController.updateFeedback
  /* 
  #swagger.summary = "Atualização de Feedback!"
  #swagger.description = "Essa rota é responsável pela atualização do Feedback!"
  #swagger.tags = ['Feedbacks']
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
                  "contents": {
                    "type": "string"
                  },
                  "productId": {
                    "type": "integer"
                  },
                  "userId": {
                    "type": "integer"
                  }
                },
                "example": {
                  "contents": "Esse produto contém açúcar",
                  "productId": 1,
                  "userId": 2
                }
              }
            }
          }
    }

    #swagger.responses[200] = {
      "description" : "Feedback atualizado com sucesso!"
    }
    #swagger.responses[500] = {
      "description" : "Erro interno!"
    }
    #swagger.responses[404] = {
      "description" : "Feedback não encontrado!"
    }

  */
);

feedbackRoutes.delete(
  "/:id",
  loginRequired,
  feedbacksController.deleteFeedback
  /* 
  #swagger.summary = "Deleta um Feedback!"
  #swagger.description = "Essa rota é responsável por deletar um Feedback!"
  #swagger.tags = ['Feedbacks']
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
       "description": "Feedback deletado com sucesso!"
    }
    #swagger.responses[404] = {
      "description" : "Feedback não encontrado!"
    }
    #swagger.responses[500] = {
       "description": "Erro interno!"
    }
    */
);

export { feedbackRoutes };
