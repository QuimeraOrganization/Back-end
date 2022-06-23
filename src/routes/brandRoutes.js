import { Router } from "express";
import { BrandController } from "../controllers/BrandController.js";
import loginRequired from "../middlewars/loginRequired.js";
const brandRoutes = Router();
const brandsController = new BrandController();

brandRoutes.post("/", brandsController.createBrand
  /* 
    #swagger.tags = ['Brands']
  */
);

brandRoutes.get("/", loginRequired, brandsController.findAllBrands
  /* 
    #swagger.tags = ['Brands']
  */
);

brandRoutes.get("/:id", loginRequired, brandsController.findBrand
  /* 
    #swagger.tags = ['Brands']
  */
);

brandRoutes.put("/:id", loginRequired, brandsController.updateBrand
  /* 
    #swagger.tags = ['Brands']
  */
);

brandRoutes.delete("/:id", loginRequired, brandsController.deleteBrand
  /* 
    #swagger.tags = ['Brands']
  */
);

export { brandRoutes };
