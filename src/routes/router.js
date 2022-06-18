import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { productRoutes } from "./productRoutes.js";
import { feedbackRoutes } from "./feedbackRoutes.js";
import { ingredientsRoutes } from "./ingredientsRoutes.js";
import { tokenRoutes } from "./tokenRoutes.js";
import { brandRoutes } from "./brandRoutes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/brands", brandRoutes);
router.use("/ingredients", ingredientsRoutes);

//TOKEN ROUTES
router.use("/token", tokenRoutes);

/*
rota para lougout, destruir o token.
app.post('/logout', function(req, res) {
    res.json({ authorization: false, token: null });
})



*/
export { router };
