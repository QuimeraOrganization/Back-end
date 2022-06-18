import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";
import jwt from "jsonwebtoken";
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

  async update(id, productDTO, authorization) {
    // Verifica se existe o produto com o id informado
    if (!this.validationPermission(id, authorization)) {
      throw new AppException(
        "Acesso permitido somente à administradores!",
        401
      );
    }
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
    if (!this.validationPermission(id, authorization)) {
      throw new AppException(
        "Acesso permitido somente à administradores!",
        401
      );
    }
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
  validationPermission(productId, authorization) {
    const [, token] = authorization.split(" ");
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, permission } = data;
    const product = prismaClient.product.findUnique({
      where: {
        id: Number(productId),
      },
    });
    if (permission === "USER") {
      if (id == product.userId) {
        return true;
      } else {
        return false;
      }
    } else if (permission === "ADMIN") {
      return true;
    }
  }
}

const productService = new ProductService();
export { productService };
