import { Router } from "express";
import { FeedbackController } from "../controllers/FeedbackController.js";
import loginRequired from "../middlewars/loginRequired.js";
const feedbackRoutes = Router();
const feedbacksController = new FeedbackController();
import { validateRequest } from "../validators/RequestValidator.js";
import { postFeedbackValidator } from "../validators/feedbacks/postFeedbackValidator.js";
import { putFeedbackValidator } from "../validators/feedbacks/putFeedbackValidator.js";

feedbackRoutes.post("/", validateRequest(postFeedbackValidator), feedbacksController.createFeedback
  /* 
    #swagger.tags = ['Feedbacks']
  */
);

feedbackRoutes.get("/", loginRequired, feedbacksController.findAllFeedbacks
  /* 
    #swagger.tags = ['Feedbacks']
  */
);

feedbackRoutes.get("/:id", loginRequired, feedbacksController.findFeedback
  /* 
    #swagger.tags = ['Feedbacks']
  */
);

feedbackRoutes.put("/:id", loginRequired, validateRequest(putFeedbackValidator), feedbacksController.updateFeedback
  /* 
    #swagger.tags = ['Feedbacks']
  */
);

feedbackRoutes.delete("/:id", loginRequired, feedbacksController.deleteFeedback
  /* 
    #swagger.tags = ['Feedbacks']
  */
);

export { feedbackRoutes };
