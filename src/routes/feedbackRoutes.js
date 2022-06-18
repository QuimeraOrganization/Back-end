import { Router } from "express";
import { FeedbackController } from "../controllers/FeedbackController.js";
import loginRequired from "../middlewars/loginRequired.js";
const feedbackRoutes = Router();
const feedbacksController = new FeedbackController();
import { validateRequest } from "../validators/RequestValidator.js";
import { postFeedbackValidator } from "../validators/feedbacks/postFeedbackValidator.js";
import { putFeedbackValidator } from "../validators/feedbacks/putFeedbackValidator.js";

//POST
feedbackRoutes.post(
  "/",
  validateRequest(postFeedbackValidator),
  feedbacksController.createFeedback
);

//GET
feedbackRoutes.get("/", loginRequired, feedbacksController.findAllFeedbacks);
feedbackRoutes.get("/:id", loginRequired, feedbacksController.findFeedback);

//UPDATE
feedbackRoutes.put(
  "/:id",
  loginRequired,
  validateRequest(putFeedbackValidator),
  feedbacksController.updateFeedback
);

//DELETE
feedbackRoutes.delete(
  "/:id",
  loginRequired,
  feedbacksController.deleteFeedback
);

export { feedbackRoutes };
