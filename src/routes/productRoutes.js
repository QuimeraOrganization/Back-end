import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import loginRequired from "../middlewars/loginRequired.js";
const productRoutes = Router();
const productsController = new ProductController();
import { validateRequest } from "../validators/RequestValidator.js";
import { postProductValidator } from "../validators/products/postProductValidator.js";
import { putProductValidator } from "../validators/products/putProductValidator.js";
import multer from "multer";

const Multer = multer({
  storage: multer.memoryStorage()
});

// productRoutes.post("/", validateRequest(postProductValidator), productsController.save);
productRoutes.post("/", Multer.single("image"), productsController.save
  /* 
    #swagger.tags = ['Products']
  */
);

productRoutes.get("/", loginRequired, productsController.findAll
  /* 
    #swagger.tags = ['Products']
  */
);

productRoutes.get("/:id", loginRequired, productsController.findById
  /* 
    #swagger.tags = ['Products']
  */
);

// productRoutes.put("/:id", loginRequired, validateRequest(putProductValidator), productsController.update);
productRoutes.put("/:id", loginRequired, Multer.single("image"), productsController.update
  /* 
    #swagger.tags = ['Products']
  */
);

productRoutes.delete("/:id", loginRequired, productsController.delete
  /* 
    #swagger.tags = ['Products']
  */
);

export { productRoutes };
