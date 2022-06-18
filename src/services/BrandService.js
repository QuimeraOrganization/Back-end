import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";

class BrandService {
  async createBrand(name, productId) {
    const brand = await prismaClient.brand.create({
      data: {
        name,
        productId,
      },
    });

    return brand;
  }

  async findBrand(id) {
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
      throw new AppException("Marca não encontrada!", 404);
    }

    return brand;
  }

  async findAllBrands() {
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

    return brands;
  }

  async updateBrand(id, name, productId) {
    let brand = prismaClient.brand.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!brand) {
      throw new AppException("Marca não encontrada!", 404);
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

    return brand;
  }

  async deleteBranch(id) {
    const brand = await prismaClient.brand.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!brand) {
      throw new AppException("Marca não encontrada!", 404);
    }

    await prismaClient.brand.delete({
      where: {
        id: Number(id),
      },
    });
  }
}

const brandService = new BrandService();
export { brandService };
