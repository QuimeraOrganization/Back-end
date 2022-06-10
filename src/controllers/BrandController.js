import { prismaClient } from "../database/prismaClient.js";

export class BrandController {
  async createBrand(req, res) {
    try {
      const { name, productId } = req.body;
      const brand = await prismaClient.brand.create({
        data: {
          name,
          productId,
        },
      });
      return res
        .status(201)
        .json({ message: "Marca cadastrada com sucesso!", brand });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findBrand(req, res) {
    try {
      const { id } = req.params;
      const brand = await prismaClient.brand.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          name: true,
          create_at: true,
          update_at: true,
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!brand) {
        return res.status(404).json({ message: "Marca não encontrada" });
      }

      return res.status(200).json(brand);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async findAllBrands(req, res) {
    try {
      const brands = await prismaClient.brand.findMany({
        orderBy: {
          id: "desc",
        },
        select: {
          id: true,
          name: true,
          create_at: true,
          update_at: true,
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return res.status(200).json(brands);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const { name, productId } = req.body;

      let brand = prismaClient.brand.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!brand) {
        return res.status(404).json({ message: "Marca não encontrado!" });
      }

      brand = await prismaClient.brand.update({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          name: true,
          create_at: true,
          update_at: true,
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        data: {
          name,
          productId,
        },
      });
      return res
        .status(200)
        .json({ message: "Marca atualizada com sucesso!", brand });
    } catch (err) {
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  async deleteBrand(req, res) {
    try {
      const { id } = req.params;
      const brand = await prismaClient.brand.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!brand) {
        return res.status(404).json({ message: "Marca não encontrado!" });
      }

      await prismaClient.brand.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ message: "Marca deletada com sucesso!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
