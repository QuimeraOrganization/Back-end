import { Router } from "express";
import { UsersController } from "../controllers/UserController.js";
import loginRequired from "../middlewars/loginRequired.js";
import adminRequired from "../middlewars/adminRequired.js";
const userRoutes = Router();
const usersController = new UsersController();
import { validateRequest } from "../validators/RequestValidator.js";
import { postUserValidator } from "../validators/users/postUserValidator.js";
import { putUserValidator } from "../validators/users/putUserValidator.js";

userRoutes.post("/", validateRequest(postUserValidator), usersController.createUser
  /* 
    #swagger.tags = ['Users']
    #swagger.open = false
  */
);

userRoutes.get("/", usersController.findAllUsers
  /* 
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

userRoutes.get("/:id", loginRequired, usersController.findUser
  /* 
    #swagger.tags = ['Users']
  */
);

userRoutes.put("/:id", loginRequired, adminRequired, validateRequest(putUserValidator), usersController.updateUser
  /* 
    #swagger.tags = ['Users']
  */
);

userRoutes.delete("/:id", loginRequired, adminRequired, usersController.deleteUser
  /* 
    #swagger.tags = ['Users']
  */
);

export { userRoutes };
