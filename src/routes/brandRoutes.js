import { Router } from "express";
import { BrandController } from "../controllers/BrandController.js";
import loginRequired from "../middlewars/loginRequired.js";
const brandRoutes = Router();
const brandsController = new BrandController();

//POST
brandRoutes.post("/", brandsController.createBrand);

//GET
brandRoutes.get("/", loginRequired, brandsController.findAllBrands);
brandRoutes.get("/:id", loginRequired, brandsController.findBrand);

//UPDATE
brandRoutes.put("/:id", loginRequired, brandsController.updateBrand);

//DELETE
brandRoutes.delete("/:id", loginRequired, brandsController.deleteBrand);

export { brandRoutes };
