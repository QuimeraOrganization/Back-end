import { Router } from "express";

import loginRequired from "../middlewars/loginRequired.js";

import { CategoryController } from "../controllers/CategoryController.js";

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post("/", categoryController.save);
categoryRoutes.get("/", loginRequired, categoryController.findAll);
categoryRoutes.get("/:id", loginRequired, categoryController.findById);
categoryRoutes.put("/:id", loginRequired, categoryController.update);
categoryRoutes.delete("/:id", loginRequired, categoryController.delete);

export { categoryRoutes };