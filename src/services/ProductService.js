import { ref, uploadBytes, deleteObject } from "firebase/storage";
import jwt from "jsonwebtoken";

import { storage } from "../database/firebase.js";
import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";

class ProductService {
  async save(productDTO, image) {

    let entity = await prismaClient.product.create({
      data: productDTO,
    });

    if (image != null) {
      await this.uploadImage(entity, image);
    }

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

  async update(id, productDTO, image, authorization) {
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

    if (image != null) {
      await this.uploadImage(entity, image);
    }

    return entity;
  }

  async delete(id, authorization) {
    if (!this.validationPermission(id, authorization)) {
      throw new AppException("Acesso permitido somente à administradores!", 401);
    }

    const entity = await prismaClient.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!entity) {
      throw new AppException("Produto não encontrado!", 404);
    }

    // Deleta imagem
    await this.deleteImage(entity);

    // Deleta entidade
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

  async uploadImage(entity, image) {
    const fileExtension = image.originalname.split('.')[1];
    const storageRef = ref(storage, `products/${entity.id}/image.${fileExtension}`);

    await uploadBytes(storageRef, image.buffer).then(snapshot => {
      // Adiciona o path da imagem na entidade produto
      entity.image = snapshot.metadata.fullPath;
    });

    entity = await prismaClient.product.update({
      where: {
        id: Number(entity.id)
      },
      data: entity
    });
  }

  async deleteImage(entity) {
    const storageRef = ref(storage, entity.image);

    await deleteObject(storageRef).then(() => {
      entity.image = null;
    }).catch(err => {
      throw new AppException(err.message, 500);
    });
  }
}

const productService = new ProductService();
export { productService };
