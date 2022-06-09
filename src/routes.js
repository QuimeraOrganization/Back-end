import { Router } from "express";
import { UsersController } from "./controllers/UserController.js";
import { TokenController } from "./controllers/tokenController/TokenController.js";
import { FeedbackController } from "./controllers/FeedbackController.js";
import { ProductController } from "./controllers/ProductController.js";
import loginRequired from "./middlewars/loginRequired.js";

const router = Router();
const token = new TokenController();

const usersController = new UsersController();
const feedbackController = new FeedbackController();
const productController = new ProductController();

//POSTS
router.post("/users", usersController.createUser);
router.post("/feedbacks", feedbackController.createFeedback);
router.post("/products", productController.save);

//GETS
router.get("/users/:id", loginRequired, usersController.findUser);
router.get("/users", usersController.findAllUsers);
router.get("/feedbacks/:id", loginRequired, feedbackController.findFeedback);
router.get("/feedbacks", feedbackController.findAllFeedbacks);
router.get("/products/:id", productController.findById);
router.get("/products", productController.findAll);

//UPDATES
router.put("/users/:id", loginRequired, usersController.updateUser);
router.put("/feedbacks/:id", loginRequired, feedbackController.updateFeedback);
router.put("/products/:id", loginRequired, productController.update);

//DELETES
router.delete("/users/:id", loginRequired, usersController.deleteUser);
router.delete("/feedbacks/:id", loginRequired, feedbackController.deleteFeedback);
router.delete("/products/:id", loginRequired, productController.delete);

//TOKEN ROUTES
router.post("/token", token.handle);

/*
rota para lougout, destruir o token.
app.post('/logout', function(req, res) {
    res.json({ authorization: false, token: null });
})

//POST
const createUser = new UsersController();
//GET
const findUser = new UsersController();
const findAllUsers = new UsersController();
//UPDATE
const updateUser = new UsersController();
//DELETE
const deleteUser = new UsersController();

*/
export { router };
