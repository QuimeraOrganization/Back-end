import { Router } from "express";
import { FeedbackController } from "../controllers/FeedbackController.js";
import loginRequired from "../middlewars/loginRequired.js";
const feedbackRoutes = Router();
const feedbacksController = new FeedbackController();

//POST
feedbackRoutes.post("/", feedbacksController.createFeedback);

//GET
feedbackRoutes.get("/", loginRequired, feedbacksController.findAllFeedbacks);
feedbackRoutes.get("/:id", loginRequired, feedbacksController.findFeedback);

//UPDATE
feedbackRoutes.put("/:id", loginRequired, feedbacksController.updateFeedback);

//DELETE
feedbackRoutes.delete(
  "/:id",
  loginRequired,
  feedbacksController.deleteFeedback
);

export { feedbackRoutes };
