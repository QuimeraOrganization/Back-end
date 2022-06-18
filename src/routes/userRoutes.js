import { Router } from "express";
import { UsersController } from "../controllers/UserController.js";
import loginRequired from "../middlewars/loginRequired.js";
import adminRequired from "../middlewars/adminRequired.js";
const userRoutes = Router();
const usersController = new UsersController();
import { validateRequest } from "../validators/RequestValidator.js";
import { postUserValidator } from "../validators/users/postUserValidator.js";
import { putUserValidator } from "../validators/users/putUserValidator.js";
//POST
userRoutes.post(
  "/",
  validateRequest(postUserValidator),
  usersController.createUser
);

//GET
userRoutes.get("/", usersController.findAllUsers);
userRoutes.get("/:id", loginRequired, usersController.findUser);

//UPDATE
userRoutes.put(
  "/:id",
  loginRequired,
  adminRequired,
  validateRequest(putUserValidator),
  usersController.updateUser
);

//DELETE
userRoutes.delete(
  "/:id",
  loginRequired,
  adminRequired,
  usersController.deleteUser
);

export { userRoutes };
