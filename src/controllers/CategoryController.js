import { categoriesService } from "../services/CategoriesService.js";

export class CategoryController {
  async save(request, response) {
    const { name } = request.body;

    const category = await categoriesService.save(name);

    response.status(201).json(category);
  }

  async update(request, response) {
    const { name } = request.body;
    const { id } = request.params;

    const category = await categoriesService.update(id, name);

    response.status(200).json(category);
  }

  async findById(request, response) {
    const { id } = request.params;

    const category = await categoriesService.findById(id);

    response.status(200).json(category);
  }

  async findAll(request, response) {
    const categories = await categoriesService.findAll();

    response.status(200).json(categories);
  }

  async delete(request, response) {
    const { id } = request.params;

    await categoriesService.delete(id);

    response.status(204).send();
  }
}