import { prismaClient } from "../database/prismaClient.js";
import { AppError } from "../errors/AppError.js";

export class IngredientsService {
  async save(name) {
    const ingredientAlreadyExists = await prismaClient.ingredient.findFirst({
      where: {
        name: name
      }
    });

    if (ingredientAlreadyExists) {
      throw new AppError("Já existe um ingrediente com esse nome cadastrado!", 400);
    }

    const ingredient = await prismaClient.ingredient.create({
      data: {
        name
      }
    });

    return ingredient;
  }

  async update(id, name) {
    const ingredientId = parseInt(id);

    const ingredientExists = await prismaClient.ingredient.findUnique({
      where: {
        id: ingredientId
      }
    });

    if (!ingredientExists) {
      throw new AppError("Ingrediente Não Encontrado", 404);
    }

    const ingredientAlreadyExists = await prismaClient.ingredient.findFirst({
      where: {
        name: name
      }
    });

    if (ingredientAlreadyExists) {
      throw new AppError("Já existe um ingrediente com esse nome cadastrado!", 400);
    }

    const ingredient = await prismaClient.ingredient.update({
      where: {
        id: ingredientId
      },

      data: {
        name
      }
    });

    return ingredient;
  }

  async findById(id) {
    const ingredientId = parseInt(id);

    const ingredientExists = await prismaClient.ingredient.findUnique({
      where: {
        id: ingredientId
      }
    });

    if (!ingredientExists) {
      throw new AppError("Ingrediente Não Encontrado", 404);
    }

    const ingredient = await prismaClient.ingredient.findUnique({
      where: {
        id: ingredientId
      }
    });

    return ingredient;
  }

  async findAll() {
    const ingredients = await prismaClient.ingredient.findMany({});

    return ingredients;
  }

  async delete(id) {
    const ingredientId = parseInt(id);

    const ingredientExists = await prismaClient.ingredient.findUnique({
      where: {
        id: ingredientId
      }
    });

    if (!ingredientExists) {
      throw new AppError("Ingrediente Não Encontrado", 404);
    }

    await prismaClient.ingredient.delete({
      where: {
        id: ingredientId
      }
    });
  }
}