import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import loginRequired from "../middlewars/loginRequired.js";
const productRoutes = Router();
const productsController = new ProductController();

//POST
productRoutes.post("/", productsController.save);

//GET
productRoutes.get("/", loginRequired, productsController.findAll);
productRoutes.get("/:id", loginRequired, productsController.findById);

//UPDATE
productRoutes.put("/:id", loginRequired, productsController.update);

//DELETE
productRoutes.delete("/:id", loginRequired, productsController.delete);

export { productRoutes };
