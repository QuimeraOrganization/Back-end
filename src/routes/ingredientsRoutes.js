import { Router } from "express";
import { IngredientsController } from "../controllers/IngredientsController.js";
import loginRequired from "../middlewars/loginRequired.js";
const ingredientsController = new IngredientsController();
const ingredientsRoutes = Router();

import { validateRequest } from "./validatorS/RequestValidator.js";


//GET
ingredientsRoutes.get("/ingredients", ingredientsController.findAll);
ingredientsRoutes.get("/ingredients/:id", ingredientsController.findById);


//POST
ingredientsRoutes.post("/ingredients", validateRequest(postIngredientsValidator), ingredientsController.save);

import { postIngredientsValidator } from
  "./validators/ingredients/postIngredientsValidator.js";

import { putIngredientsValidator } from
  "./validators/ingredients/putIngredientsValidator.js";

//PUT
ingredientsRoutes.put("/ingredients/:id", loginRequired, validateRequest(putIngredientsValidator), ingredientsController.update);

//DELETE
ingredientsRoutes.delete("/ingredients/:id", loginRequired, ingredientsController.delete);


  export {ingredientsRoutes}