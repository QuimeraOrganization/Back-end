import { Router } from "express";
import { IngredientsController } from "../controllers/IngredientsController.js";
import loginRequired from "../middlewars/loginRequired.js";
const ingredientsController = new IngredientsController();
const ingredientsRoutes = Router();

import { validateRequest } from "../validators/RequestValidator.js";
import { postIngredientsValidator } from "../validators/ingredients/postIngredientsValidator.js";
import { putIngredientsValidator } from "../validators/ingredients/putIngredientsValidator.js";

ingredientsRoutes.post("/", validateRequest(postIngredientsValidator), ingredientsController.save
  /* 
    #swagger.tags = ['Ingredients']
  */
);

ingredientsRoutes.get("/", ingredientsController.findAll
  /* 
    #swagger.tags = ['Ingredients']
  */
);

ingredientsRoutes.get("/:id", ingredientsController.findById
  /* 
    #swagger.tags = ['Ingredients']
  */
);

ingredientsRoutes.put("/:id", loginRequired, validateRequest(putIngredientsValidator), ingredientsController.update
  /* 
    #swagger.tags = ['Ingredients']
  */
);

ingredientsRoutes.delete("/:id", loginRequired, ingredientsController.delete
  /* 
    #swagger.tags = ['Ingredients']
  */
);

export { ingredientsRoutes };
