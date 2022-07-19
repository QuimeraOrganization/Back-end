import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";
import jwt from "jsonwebtoken";
class IngredientsService {
  async save(name) {
    const ingredientAlreadyExists = await prismaClient.ingredient.findFirst({
      where: {
        name: name,
      },
    });

    if (ingredientAlreadyExists) {
      throw new AppException("Ingrediente já cadastrado!", 400);
    }

    const ingredient = await prismaClient.ingredient.create({
      data: {
        name,
      },
    });

    return ingredient;
  }

  async update(id, name, authorization) {
    if (!this.validationPermission(id, authorization)) {
      throw new AppException(
        "Acesso permitido somente à administradores!",
        401
      );
    }
    const ingredientId = parseInt(id);

    const ingredientExists = await prismaClient.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
    });

    if (!ingredientExists) {
      throw new AppException("Ingrediente Não Encontrado", 404);
    }

    const ingredientAlreadyExists = await prismaClient.ingredient.findFirst({
      where: {
        name: name,
      },
    });

    if (ingredientAlreadyExists) {
      throw new AppException(
        "Já existe um ingrediente com esse nome cadastrado!",
        400
      );
    }

    const ingredient = await prismaClient.ingredient.update({
      where: {
        id: ingredientId,
      },

      data: {
        name,
      },
    });

    return ingredient;
  }

  async findById(id) {
    const ingredientId = parseInt(id);

    const ingredientExists = await prismaClient.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
    });

    if (!ingredientExists) {
      throw new AppException("Ingrediente Não Encontrado", 404);
    }

    return ingredientExists;
  }

  async findAll() {
    const ingredients = await prismaClient.ingredient.findMany({
      include: {
        IngredientsOnProducts: {
          select: {
            product: true
          }
        }
      }
    });

    return ingredients;
  }

  async delete(id, authorization) {
    if (!this.validationPermission(id, authorization)) {
      throw new AppException(
        "Acesso permitido somente à administradores!",
        401
      );
    }
    const ingredientId = parseInt(id);

    const ingredientExists = await prismaClient.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
    });

    if (!ingredientExists) {
      throw new AppException("Ingrediente Não Encontrado", 404);
    }

    await prismaClient.ingredient.delete({
      where: {
        id: ingredientId,
      },
    });
  }
  validationPermission(idRequest, authorization) {
    const [, token] = authorization.split(" ");
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, permission } = data;

    if (permission === "ADMIN") {
      return true;
    }
  }
}

const ingredientsService = new IngredientsService();
export { ingredientsService };
