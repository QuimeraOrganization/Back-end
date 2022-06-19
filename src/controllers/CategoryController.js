import { categoriesService } from "../services/CategoriesService.js";

export class CategoryController {
  async save(req, res) {
    const { name } = req.body;

    const category = await categoriesService.save(name);

    res.status(201).json(category);
  }

  async update(req, res) {
    const { name } = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;
    const category = await categoriesService.update(id, name, authorization);

    res.status(200).json(category);
  }

  async findById(req, res) {
    const { id } = req.params;

    const category = await categoriesService.findById(id);

    res.status(200).json(category);
  }

  async findAll(req, res) {
    const categories = await categoriesService.findAll();

    res.status(200).json(categories);
  }

  async delete(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    await categoriesService.delete(id, authorization);

    res.status(204).send();
  }
}
