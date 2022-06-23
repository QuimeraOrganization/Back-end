import { Router } from "express";

import loginRequired from "../middlewars/loginRequired.js";

import { CategoryController } from "../controllers/CategoryController.js";

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post("/", categoryController.save
  /* 
    #swagger.tags = ['Categories']
  */
);

categoryRoutes.get("/", loginRequired, categoryController.findAll
  /* 
    #swagger.tags = ['Categories']
  */
);

categoryRoutes.get("/:id", loginRequired, categoryController.findById
  /* 
    #swagger.tags = ['Categories']
  */
);

categoryRoutes.put("/:id", loginRequired, categoryController.update
  /* 
    #swagger.tags = ['Categories']
  */
);

categoryRoutes.delete("/:id", loginRequired, categoryController.delete
  /* 
    #swagger.tags = ['Categories']
  */
);

export { categoryRoutes };