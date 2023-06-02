import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import jwt from "jsonwebtoken";

import { storage } from "../database/firebase.js";
import { prismaClient } from "../database/prismaClient.js";
import { AppException } from "../exceptions/AppException.js";

const includeResponseGet = {
  brand: true,
  user: {
    select: {
      id: true,
      email: true,
      permission: true,
    },
  },
  CategoriesOnProducts: {
    include: {
      category: true,
    },
  },
  IngredientsOnProducts: {
    include: {
      ingredient: true,
    },
  },
  feedbacks: {
    include: {
      user: true,
    },
  },
};

class ProductService {
  async save(productDTO, image) {
    const products = await prismaClient.product.findMany({
      where: {
        name: productDTO.name,
      },
    });

    //Verifica se tem produto com essa mesma marca cadastrado com o mesmo nome
    products.forEach((product) => {
      if (product.brandId === productDTO.brandId) {
        throw new AppException("Produto já cadastrado com esse nome", 400);
      }
    });

    let entity = await prismaClient.product.create({
      data: {
        name: productDTO.name,
        description: productDTO.description,
        brandId: productDTO.brandId,
        userId: productDTO.userId,

        CategoriesOnProducts: {
          create: productDTO.categories?.map((categoryId) => ({
            category: {
              connect: {
                id: categoryId,
              },
            },
          })),
        },
        IngredientsOnProducts: {
          create: productDTO.ingredients?.map((ingredientId) => ({
            ingredient: {
              connect: {
                id: ingredientId,
              },
            },
          })),
        },
      },
    });

    if (image != null) {
      await this.uploadImage(entity, image);
    }

    return entity;
  }

  async findAll(
    limit,
    page,
    skip,
    containsIngredients,
    noContainsIngredients,
    categories,
    name
  ) {

    if (name) {
      const conditionsNameSearch = {
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          }
        }
      };

      const [products, totalProducts] = await Promise.all([
        prismaClient.product.findMany({
          ...conditionsNameSearch,
          include: includeResponseGet,
        }),
        prismaClient.product.count(conditionsNameSearch),
      ]);

      // Adiciona o link de download da imagem
      for (let product of products) {
        await this.getDownloadURL(product);
      }

      const productsPage = {
        data: products,
        page: page,
        limit: limit,
        totalPages: parseInt(Math.ceil(totalProducts / limit)),
        totalRecords: totalProducts,
      };

      return productsPage;
    }

    if (categories) {
      const conditionsContainsCategories = {
        where: {
          OR: categories?.map((categoryId) => ({
            CategoriesOnProducts: {
              some: {
                categoryId: parseInt(categoryId),
              },
            },
          })),
        },
      };

      const [products, totalProducts] = await Promise.all([
        prismaClient.product.findMany({
          ...conditionsContainsCategories,
          include: includeResponseGet,
        }),
        prismaClient.product.count(conditionsContainsCategories),
      ]);

      // Adiciona o link de download da imagem
      for (let product of products) {
        await this.getDownloadURL(product);
      }

      const productsPage = {
        data: products,
        page: page,
        limit: limit,
        totalPages: parseInt(Math.ceil(totalProducts / limit)),
        totalRecords: totalProducts,
      };

      return productsPage;
    }

    if (noContainsIngredients) {
      const conditionsNoContainsIngredients = {
        where: {
          NOT: noContainsIngredients?.map((ingredientId) => ({
            IngredientsOnProducts: {
              some: {
                ingredientId: parseInt(ingredientId),
              },
            },
          })),
        },
      };

      const [products, totalProducts] = await Promise.all([
        prismaClient.product.findMany({
          ...conditionsNoContainsIngredients,
          include: includeResponseGet,
        }),
        prismaClient.product.count(conditionsNoContainsIngredients),
      ]);

      // Adiciona o link de download da imagem
      for (let product of products) {
        await this.getDownloadURL(product);
      }

      const productsPage = {
        data: products,
        page: page,
        limit: limit,
        totalPages: parseInt(Math.ceil(totalProducts / limit)),
        totalRecords: totalProducts,
      };

      return productsPage;
    }

    if (containsIngredients) {
      const conditionsContainsIngredients = {
        where: {
          OR: containsIngredients?.map((ingredientId) => ({
            IngredientsOnProducts: {
              some: {
                ingredientId: parseInt(ingredientId),
              },
            },
          })),
        },
      };

      const [products, totalProducts] = await Promise.all([
        prismaClient.product.findMany({
          ...conditionsContainsIngredients,
          include: includeResponseGet,
        }),
        prismaClient.product.count(conditionsContainsIngredients),
      ]);

      // Adiciona o link de download da imagem
      for (let product of products) {
        await this.getDownloadURL(product);
      }

      const productsPage = {
        data: products,
        page: page,
        limit: limit,
        totalPages: parseInt(Math.ceil(totalProducts / limit)),
        totalRecords: totalProducts,
      };

      return productsPage;
    }

    if (!containsIngredients && !noContainsIngredients && !categories && !name) {
      const [products, totalProducts] = await Promise.all([
        prismaClient.product.findMany({
          skip: skip,
          take: limit,
          include: includeResponseGet,
        }),
        prismaClient.product.count(),
      ]);

      // Adiciona o link de download da imagem
      for (let product of products) {
        await this.getDownloadURL(product);
      }

      const productsPage = {
        data: products,
        page: page,
        limit: limit,
        totalPages: parseInt(Math.ceil(totalProducts / limit)),
        totalRecords: totalProducts,
      };

      return productsPage;
    }
  }

  async findAllProducts() {
    const products = await prismaClient.product.findMany({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return products;
  }

  async findById(id) {
    const product = await prismaClient.product.findUnique({
      where: {
        id: Number(id),
      },

      include: includeResponseGet,
    });

    if (!product) {
      throw new AppException("Produto não encontrado!", 404);
    }

    // Adiciona o link de download da imagem
    await this.getDownloadURL(product);

    return product;
  }

  async update(id, productDTO, image, authorization) {
    // Verifica se o usuário logado tem permissão para editar o produto
    if (!this.validationPermission(id, authorization)) {
      throw new AppException(
        "Acesso permitido somente à administradores!",
        401
      );
    }

    // Verifica se existe o produto com o id informado
    let entity = await prismaClient.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!entity) {
      throw new AppException("Produto não encontrado!", 404);
    }

    //Verifica se tem produto com essa mesma marca cadastrado com o mesmo nome
    const products = await prismaClient.product.findMany({
      where: {
        name: productDTO.name,
      },
    });

    products.forEach((product) => {
      if (product.brandId === productDTO.brandId) {
        if (product.id != id) {
          throw new AppException("Produto já cadastrado com esse nome", 400);
        }
      }
    });

    await prismaClient.categoriesOnProducts.deleteMany({
      where: {
        productId: entity.id,
      },
    });

    await prismaClient.ingredientsOnProducts.deleteMany({
      where: {
        productId: entity.id,
      },
    });

    // Atualiza a entidade
    entity = await prismaClient.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: productDTO.name,
        description: productDTO.description,
        brandId: productDTO.brandId,
        userId: productDTO.userId,

        CategoriesOnProducts: {
          create: productDTO.categories?.map((categoryId) => ({
            category: {
              connect: {
                id: categoryId,
              },
            },
          })),
        },
        IngredientsOnProducts: {
          create: productDTO.ingredients?.map((ingredientId) => ({
            ingredient: {
              connect: {
                id: ingredientId,
              },
            },
          })),
        },
      },
    });

    if (image != null) {
      await this.uploadImage(entity, image);
    }

    return entity;
  }

  async delete(id, authorization) {
    if (!(await this.validationPermission(id, authorization))) {
      throw new AppException(
        "Acesso permitido somente à administradores!",
        401
      );
    }

    const entity = await prismaClient.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!entity) {
      throw new AppException("Produto não encontrado!", 404);
    }

    // Deleta imagem
    await this.deleteImage(entity);

    // Deleta entidade
    await prismaClient.product.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async deleteProductImage(id, authorization) {
    if (!(await this.validationPermission(id, authorization))) {
      throw new AppException(
        "Acesso permitido somente à administradores!",
        401
      );
    }

    const entity = await prismaClient.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!entity) {
      throw new AppException("Produto não encontrado!", 404);
    }

    // Deleta imagem
    await this.deleteImage(entity);
  }

  async validationPermission(productId, authorization) {
    const [, token] = authorization.split(" ");
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, permission, brandId } = data;
    const product = await prismaClient.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (permission === "USER") {
      if (id == product.userId) {
        return true;
      } else {
        return false;
      }
    } else if (permission === "ADMIN") {
      return true;
    }
    if (permission === "BRAND") {
      if (brandId == product.brandId) {
        return true;
      } else {
        return false;
      }
    }
  }

  async uploadImage(entity, image) {

    console.log("uploadImage")
    try{

      const fileExtension = image.originalname.split(".")[1];
      const storageRef = ref(
        storage,
        `products/${entity.id}/image.${fileExtension}`
      );
      console.log("após o ref", storageRef, image.buffer)
        
      const snapshot = await uploadBytes(storageRef, image.buffer)
                  
      entity.image = snapshot.metadata.fullPath;
   
  
      console.log(entity);
  
      entity = await prismaClient.product.update({
        where: {
          id: Number(entity.id),
        },
        data: entity,
      });
    }catch(error){
      console.log("error image", error)
    }

  }

  async deleteImage(entity) {
    if (entity) {
      const storageRef = ref(storage, entity.image);

      await deleteObject(storageRef)
        .then(() => {
          entity.image = null;
        })
        .catch((err) => {
          throw new AppException(err.message, 500);
        });

      await prismaClient.product.update({
        where: {
          id: entity.id,
        },
        data: {
          image: null,
        },
      });
    }
  }

  async getDownloadURL(entity) {
    if (entity.image) {
      const storageRef = ref(storage, entity.image);

      await getDownloadURL(storageRef).then((url) => {
        entity.image = url;
      });
    }
  }
}

const productService = new ProductService();
export { productService };
