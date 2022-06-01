import { Router } from "express";
import { UsersController } from "./controllers/UserController.js";
import { TokenController } from "./controllers/tokenController/TokenController.js";
import loginRequired from "./middlewars/loginRequired.js";

const router = Router();
const token = new TokenController();
//CREATE
const createUser = new UsersController();
//GET
const findUser = new UsersController();
const findAllUsers = new UsersController();
//UPDATE
const updateUser = new UsersController();
//DELETE
const deleteUser = new UsersController();

//POSTS
router.post("/user", createUser.createUser);
//GETS
router.get("/user/:id", loginRequired, findUser.findUser);
router.get("/allUsers", findAllUsers.findAllUsers);
//UPDATES
router.put("/user/:id", loginRequired, updateUser.updateUser);
//DELETES
router.delete("user/:id", deleteUser.deleteUser);

//TOKEN ROUTES
router.post("/token", token.handle);

/*
rota para lougout, destruir o token.
app.post('/logout', function(req, res) {
    res.json({ authorization: false, token: null });
})

*/
export { router };
