import { IngredientsService } from "../services/IngredientsService.js";

export class IngredientsController {
  async save(request, response) {
    const { name } = request.body;

    const ingredientsService = new IngredientsService();

    const ingredient = await ingredientsService.save(name);

    response.status(201).json(ingredient);
  }

  async update(request, response) {
    const { name } = request.body;
    const { id } = request.params;

    const ingredientsService = new IngredientsService();

    const ingredient = await ingredientsService.update(id, name);

    response.status(200).json(ingredient);
  }

  async findById(request, response) {
    const { id } = request.params;

    const ingredientsService = new IngredientsService();

    const ingredient = await ingredientsService.findById(id);

    response.status(200).json(ingredient);
  }

  async findAll(request, response) {
    const ingredientsService = new IngredientsService();

    const ingredients = await ingredientsService.findAll();

    response.status(200).json(ingredients);
  }

  async delete(request, response) {
    const { id } = request.params;

    const ingredientsService = new IngredientsService();

    await ingredientsService.delete(id);

    response.status(204).send();
  }
}