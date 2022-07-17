import { brandService } from "../services/BrandService.js";

export class BrandController {
  async createBrand(req, res) {
    const { name, productId } = req.body;
    const brand = await brandService.createBrand(name, productId);

    return res.status(201).json(brand);
  }

  async findBrand(req, res) {
    const { id } = req.params;

    const brand = await brandService.findBrand(id);

    return res.status(200).json(brand);
  }

  async findAllBrands(req, res) {
    const brands = await brandService.findAllBrands();

    return res.status(200).json(brands);
  }

  async updateBrand(req, res) {
    const { id } = req.params;
    const { name, productId } = req.body;
    const { authorization } = req.headers;

    const brand = await brandService.updateBrand(
      id,
      name,
      productId,
      authorization
    );

    return res.status(200).json(brand);
  }

  async deleteBrand(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    await brandService.deleteBrand(id, authorization);

    return res.status(204).send();
  }
}
