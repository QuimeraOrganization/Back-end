import { prismaClient } from '../database/prismaClient.js';

export class FeedbackController {
  async createFeedback(req, res) {
    try {
      const { contents, productId, userId } = req.body;
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
      return res
        .status(201)
        .json({ message: 'Feedback cadastrado com sucesso!', feedback });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findFeedback(req, res) {
    try {
      const { id } = req.params;
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
        return res.status(404).json({ message: 'Feedback não encontrado' });
      }

      return res.status(200).json(feedback);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async findAllFeedbacks(req, res) {
    try {
      const feedbacks = await prismaClient.feedback.findMany({
        orderBy: {
          id: 'desc',
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

      return res.status(200).json(feedbacks);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateFeedback(req, res) {
    try {
      const { id } = req.params;
      const { contents, userId, productId } = req.body;

      let feedback = prismaClient.feedback.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!feedback) {
        return res.status(404).json({ message: 'Feedback não encontrado!' });
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
      return res
        .status(200)
        .json({ message: 'Feedback atualizado com sucesso!', feedback });
    } catch (err) {
      return res.status(500).json({ message: 'Erro no servidor' });
    }
  }

  async deleteFeedback(req, res) {
    try {
      const { id } = req.params;
      const feedback = await prismaClient.feedback.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback não encontrado!' });
      }

      await prismaClient.feedback.delete({
        where: {
          id: Number(id),
        },
      });
      return res
        .status(200)
        .json({ message: 'Feedback deletado com sucesso!' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
