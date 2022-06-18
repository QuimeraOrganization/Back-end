import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";

class FeedbackService {
  async createFeedback(contents, productId, userId) {
    if (!contents || !productId || !userId) {
      throw new AppException(
        "Por favor, verifique os campos e tente novamente!",
        401
      );
    }
    const feedback = await prismaClient.feedback.create({
      select: {
        id: true,
        contents: true,
        create_at: true,
        update_at: true,
        product: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      data: {
        contents,
        productId,
        userId,
      },
    });
    return feedback;
  }

  async findFeedback(id) {
    const feedback = await prismaClient.feedback.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        contents: true,
        create_at: true,
        update_at: true,
        product: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!feedback) {
      throw new AppException("Feedback não encontrado!", 404);
    }
    return feedback;
  }

  async findAllFeedbacks() {
    const feedbacks = await prismaClient.feedback.findMany({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        contents: true,
        create_at: true,
        update_at: true,
        product: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    return feedbacks;
  }

  async updateFeedbacks(id, contents, userId, productId) {
    let feedback = prismaClient.feedback.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!feedback) {
      throw new AppException("Feedback não encontrado!", 404);
    }

    feedback = await prismaClient.feedback.update({
      where: {
        id: Number(id),
      },
      data: {
        contents,
        userId,
        productId,
      },
    });
    return feedback;
  }

  async deleteFeedback(id) {
    const feedback = await prismaClient.feedback.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!feedback) {
      throw new AppException("Feedback não encontrado!", 404);
    }

    await prismaClient.feedback.delete({
      where: {
        id: Number(id),
      },
    });
    return feedback;
  }
}

const feedbackService = new FeedbackService();
export { feedbackService };
