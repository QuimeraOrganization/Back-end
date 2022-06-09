import { prismaClient } from "../database/prismaClient.js";

export class ProductController {

  async save(req, res) {
    try {
      const productDTO = req.body;

      // Verificar se existe produto com o mesmo nome na mesma marca

      const entity = await prismaClient.product.create({
        data: productDTO
      });

      return res.status(201).json(entity);

    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findAll(req, res) {
    try {
      const products = await prismaClient.product.findMany();

      return res.status(200).json(products);

    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      const product = await prismaClient.product.findUnique({
        where: {
          id: Number(id)
        }
      });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.status(200).json(product);

    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const productDTO = req.body;

      // Verifica se existe o produto com o id informado
      let entity = await prismaClient.product.findUnique({
        where: {
          id: Number(id)
        }
      });

      if (!entity) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      // Atualiza a entidade
      entity = await prismaClient.product.update({
        where: {
          id: Number(id)
        },
        data: productDTO
      });

      return res.status(200).json(entity);

    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const entity = await prismaClient.product.findUnique({
        where: {
          id: Number(id)
        }
      });

      if (!entity) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await prismaClient.product.delete({
        where: {
          id: Number(id)
        }
      });

      return res.status(204).json({ message: "Produto deletado com sucesso!" });

    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}