import { prismaClient } from "../database/prismaClient.js";
import { feedbackService } from "../services/FeedbackService.js";

export class FeedbackController {
  async createFeedback(req, res) {
    const { contents, productId, userId } = req.body;
    const feedback = await feedbackService.createFeedback(
      contents,
      productId,
      userId
    );
    return res
      .status(201)
      .json({ message: "Feedback cadastrado com sucesso!", feedback });
  }

  async findFeedback(req, res) {
    const { id } = req.params;
    const feedback = await feedbackService.findFeedback(id);
    return res.status(200).json(feedback);
  }

  async findAllFeedbacks(req, res) {
    const feedbacks = await feedbackService.findAllFeedbacks();
    return res.status(200).json(feedbacks);
  }

  async updateFeedback(req, res) {
    const { id } = req.params;
    const { contents, userId, productId } = req.body;

    const feedback = await feedbackService.updateFeedbacks(
      id,
      contents,
      userId,
      productId
    );
    return res
      .status(200)
      .json({ message: "Feedback atualizado com sucesso!", feedback });
  }

  async deleteFeedback(req, res) {
    const { id } = req.params;
    await feedbackService.deleteFeedback(id);
    return res.status(200).send("Feedback deletado com sucesso!");
  }
}
