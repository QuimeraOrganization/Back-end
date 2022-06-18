import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";

class CategoriesService {
  async save(name) {
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    });

    if (categoryAlreadyExists) {
      throw new AppException("Já existe uma Categoria com esse nome cadastrado!");
    }

    const category = await prismaClient.category.create({
      data: {
        name
      }
    });

    return category;
  }

  async update(id, name) {
    const categoryId = parseInt(id);

    const categoryAlreadyExists = await prismaClient.category.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!categoryAlreadyExists) {
      throw new AppException("Categoria não Encontrada", 404);
    }

    const categoryAlreadyExistsWithSameName = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    });

    if (categoryAlreadyExistsWithSameName) {
      throw new AppException("Já existe uma Categoria com esse nome cadastrado!", 400);
    }

    const category = await prismaClient.category.update({
      where: {
        id: categoryId
      },

      data: {
        name
      }
    });

    return category;
  }

  async findById(id) {
    const categoryId = parseInt(id);

    const categoryAlreadyExists = await prismaClient.category.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!categoryAlreadyExists) {
      throw new AppException("Categoria não Encontrada", 404);
    }

    return categoryAlreadyExists;
  }

  async findAll() {
    const categories = await prismaClient.category.findMany({});

    return categories;
  }

  async delete(id) {
    const categoryId = parseInt(id);

    const categoryAlreadyExists = await prismaClient.category.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!categoryAlreadyExists) {
      throw new AppException("Categoria não Encontrada", 404);
    }

    await prismaClient.category.delete({
      where: {
        id: categoryId
      }
    });
  }
}

const categoriesService = new CategoriesService();
export { categoriesService }; 