import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";
import jwt from "jsonwebtoken";
class BrandService {
  async createBrand(name) {
    const brand = await prismaClient.brand.create({
      data: {
        name,
      },
    });

    return brand;
  }

  async findBrand(id) {
    const brand = await prismaClient.brand.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
        product: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    if (!brand) {
      throw new AppException("Marca não encontrada!", 404);
    }

    return brand;
  }

  async findAllBrands() {
    const brands = await prismaClient.brand.findMany({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return brands;
  }

  async updateBrand(id, name, authorization) {
    if (!this.validationPermission(id, authorization)) {
      throw new AppException(
        "Acesso permitido somente à administradores!",
        401
      );
    }

    let brand = prismaClient.brand.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!brand) {
      throw new AppException("Marca não encontrada!", 404);
    }

    brand = await prismaClient.brand.update({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      data: {
        name,
      },
    });

    return brand;
  }

  async deleteBrand(id, authorization) {
    if (!this.validationPermission(id, authorization)) {
      throw new AppException(
        "Acesso permitido somente à administradores!",
        401
      );
    }
    const brand = await prismaClient.brand.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!brand) {
      throw new AppException("Marca não encontrada!", 404);
    }

    await prismaClient.brand.delete({
      where: {
        id: Number(id),
      },
    });
  }

  validationPermission(idRequest, authorization) {
    const [, token] = authorization.split(" ");
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, permission } = data;

    if (permission === "USER" || permission === "BRAND") {
      if (id == idRequest) {
        return true;
      } else {
        return false;
      }
    } else if (permission === "ADMIN") {
      return true;
    }
  }
}

const brandService = new BrandService();
export { brandService };
