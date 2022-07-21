import { productService } from "../services/ProductService.js";

export class ProductController {
  async save(req, res) {
    const productDTO = JSON.parse(req.body.product);
    const image = req.file;

    const entity = await productService.save(productDTO, image);

    return res.status(201).json(entity);
  }

  async findAll(req, res) {
    const { contains_ingredients, no_contains_ingredients, categories } = req.query;

    const limit = req.query.limit;
    const page = req.query.page;
    const skip = req.skip;

    const products = await productService.findAll(limit, page, skip, contains_ingredients, no_contains_ingredients, categories);
    return res.status(200).json(products);
  }
  async findAllProducts(req, res) {
    const products = await productService.findAllProducts();
    return res.status(200).json(products);
  }

  async findById(req, res) {
    const { id } = req.params;
    const product = await productService.findById(id);

    return res.status(200).json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    const productDTO = JSON.parse(req.body.product);
    const image = req.file;

    const entity = await productService.update(
      id,
      productDTO,
      image,
      authorization
    );

    return res.status(200).json(entity);
  }

  async delete(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    await productService.delete(id, authorization);

    return res.status(204).send({ message: "Produto deletado com sucesso!" });
  }

  async deleteProductImage(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    await productService.deleteProductImage(id, authorization);

    return res.status(204).send({ message: "Imagem do produto deletado com sucesso!" });
  }
}
