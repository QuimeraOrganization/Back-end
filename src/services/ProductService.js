import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";

class ProductService {
  async save(productDTO) {
    const entity = await prismaClient.product.create({
      data: productDTO,
    });
    return entity;
  }

  async findAll() {
    const products = await prismaClient.product.findMany();
    return products;
  }

  async findById(id) {
    const product = await prismaClient.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      throw new AppException("Produto não encontrado!", 404);
    }
    return product;
  }

  async update(id, productDTO) {
    // Verifica se existe o produto com o id informado
    let entity = await prismaClient.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!entity) {
      throw new AppException("Produto não encontrado!", 404);
    }

    // Atualiza a entidade
    entity = await prismaClient.product.update({
      where: {
        id: Number(id),
      },
      data: productDTO,
    });
    return entity;
  }
  async delete(id) {
    const entity = await prismaClient.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!entity) {
      throw new AppException("Produto não encontrado!", 404);
    }

    await prismaClient.product.delete({
      where: {
        id: Number(id),
      },
    });
  }
}

const productService = new ProductService();
export { productService };
