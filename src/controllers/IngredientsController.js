import { ingredientsService } from "../services/IngredientsService.js";

export class IngredientsController {
  async save(req, res) {
    const { name } = req.body;

    const ingredient = await ingredientsService.save(name);

    res.status(201).json(ingredient);
  }

  async update(req, res) {
    const { name } = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;

    const ingredient = await ingredientsService.update(id, name, authorization);

    res.status(200).json(ingredient);
  }

  async findById(req, res) {
    const { id } = req.params;

    const ingredient = await ingredientsService.findById(id);
    ingredientsService;
    res.status(200).json(ingredient);
  }

  async findAll(req, res) {
    const ingredients = await ingredientsService.findAll();
    res.status(200).json(ingredients);
  }

  async delete(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    await ingredientsService.delete(id, authorization);

    res.status(204).send();
  }
}
