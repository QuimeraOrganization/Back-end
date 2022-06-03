import { prismaClient } from '../database/prismaClient.js';

export class FeedbackController {
  async createFeedback(req, res) {
    try {
      const { contents, productId, userId } = req.body;
      const feedback = await prismaClient.feedback.create({
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
      return res.status(400).json({ error: err.message });
    }
  }

  async findFeedback(req, res) {
    try {
      const { id } = req.params;
      const feedback = await prismaClient.feedback.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!feedback) {
        return res.json({ error: 'Esse feedback não existe!' });
      }

      return res.status(200).json(feedback);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async findAllFeedbacks(req, res) {
    try {
      const feedbacks = await prismaClient.feedback.findMany();

      if (!feedbacks) {
        return res.json({ error: 'Nenhum feedback encontrado!' });
      }
      return res.status(200).json(feedbacks);
    } catch (err) {
      return res.status(500).json({ error: err.message });
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
        return res.json({ error: 'Esse feedback não existe!' });
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
        return res.json({ error: 'Esse feedback não existe!' });
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
      return res.status(500).json({ error: err.message });
    }
  }
}
