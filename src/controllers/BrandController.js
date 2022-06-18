import { brandService } from "../services/BrandService.js";

export class BrandController {
  async createBrand(req, res) {
    const { name, productId } = req.body;
    const brand = brandService.createBrand(name, productId);

    return res.status(201).json(brand);
  }

  async findBrand(req, res) {
    const { id } = req.params;

    const brand = brandService.findBrand(id);

    return res.status(200).json(brand);
  }

  async findAllBrands(req, res) {
    const brands = brandService.findAllBrands();

    return res.status(200).json(brands);
  }

  async updateBrand(req, res) {
    const { id } = req.params;
    const { name, productId } = req.body;

    const brand = brandService.updateBrand(id, name, productId);

    return res.status(200).json(brand);
  }

  async deleteBrand(req, res) {
    const { id } = req.params;

    brandService.deleteBranch(id);

    return res.status(204).send();
  }
}
