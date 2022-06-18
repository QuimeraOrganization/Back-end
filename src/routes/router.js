import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { productRoutes } from "./productRoutes.js";
import { feedbackRoutes } from "./feedbackRoutes.js";
import { ingredientsRoutes } from "./ingredientsRoutes.js";
import { tokenRoutes } from "./tokenRoutes.js";
import { brandRoutes } from "./brandRoutes.js";
import { categoryRoutes } from "./categoryRoutes.js";
import swaggerUI from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
const swaggerDocument = require("../../swagger.json");
const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/brands", brandRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/categories", categoryRoutes);

//TOKEN ROUTES
router.use("/token", tokenRoutes);

//SWAGGER ROUTES
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/*
rota para lougout, destruir o token.
app.post('/logout', function(req, res) {
    res.json({ authorization: false, token: null });
})



*/
export { router };
