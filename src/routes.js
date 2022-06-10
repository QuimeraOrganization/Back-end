import { Router } from "express";
import { TokenController } from "./controllers/tokenController/TokenController.js";
import { userRoutes } from "./routes/userRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { feedbackRoutes } from "./routes/feedbackRoutes.js";

const router = Router();
const token = new TokenController();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/feedbacks", feedbackRoutes);

//TOKEN ROUTES
router.post("/token", token.handle);

/*
rota para lougout, destruir o token.
app.post('/logout', function(req, res) {
    res.json({ authorization: false, token: null });
})



*/
export { router };
