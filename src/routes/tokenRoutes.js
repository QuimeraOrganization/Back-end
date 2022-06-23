import { Router } from "express";
import { TokenController } from "../controllers/tokenController/TokenController.js";

const tokenRoutes = Router();
const tokenController = new TokenController();

tokenRoutes.post("/", tokenController.handle
  /* 
    #swagger.tags = ['Authentication']
  */
);

export { tokenRoutes };
