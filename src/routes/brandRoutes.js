import { Router } from "express";
import { BrandController } from "../controllers/BrandController.js";
import loginRequired from "../middlewars/loginRequired.js";
const brandRoutes = Router();
const brandsController = new BrandController();

brandRoutes.post(
  "/",
  brandsController.createBrand
  /* 
     #swagger.summary = "Cadastro de Marcas!"
    #swagger.description = "Essa rota é responsável pelo cadastro de Marcas!"
    #swagger.tags = ['Brands']
    #swagger.requestBody = {
      required: true,
         "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "productId": {
                    "type": "integer"
                  }
                },
                "example": {
                  "name": "Coca-cola",
                  "productId": 1
                }
              }
            }
          }
    }
    #swagger.responses[201] = {
       "description": "Marca cadastrada com sucesso!",
    }
    #swagger.responses[400] = {
      "description": "Verifique se os campos necessários e as atribuições no exemplo estão corretas e tente novamente!"
    }
  */
);

brandRoutes.get(
  "/",

  brandsController.findAllBrands
  /* 
    #swagger.summary = "Busca por todas as Marcas!"
    #swagger.description = "Essa rota é responsável por buscar todas as Marcas cadastradas no banco!"
    #swagger.tags = ['Brands']
     #swagger.security = [{
      "bearerAuth": []
    }]

    #swagger.responses[200] = {
      description: "Busca por todas as Marcas!",
      content:{
        "application/json": {
          example: [
            {
              "name": "Elma Chips",
              productId: 1,
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },        
          ]
        }
      }   
    } 
  */
);

brandRoutes.get(
  "/:id",
  loginRequired,
  brandsController.findBrand
  /* 
    #swagger.summary = "Busca por todas as Marcas!"
    #swagger.description = "Essa rota é responsável por buscar todas as Marcas cadastradas no banco!"
    #swagger.tags = ['Brands']
     #swagger.security = [{
      "bearerAuth": []
    }]
     #swagger.parameters = [
      {
            "in": "path",
            "name": "id",
            "type": "string",
            "required": true
      }
    ]
       #swagger.responses[200] = {
      description: "Busca por todas as Marcas!",
      content:{
        "application/json": {
          example: [
            {
              "name": "Elma Chips",
              productId: 1,
              created_at: "2022-06-18T14:04:38.614Z",
              updated_at: "2022-06-19T01:57:29.794Z"
            },        
          ]
        }
      }   
    } 

    #swagger.responses[404] = {
       "description": "Marca não encontrada."
    }

    #swagger.responses[500] = {
       "description": "Erro interno!"
    }



  */
);

brandRoutes.put(
  "/:id",
  loginRequired,
  brandsController.updateBrand
  /* 
    #swagger.summary = "Atualização de uma Marca!"
    #swagger.description = "Essa rota é responsável pela atualização de uma Marca!"
    #swagger.tags = ['Brands']
     #swagger.security = [{
      "bearerAuth": []
    }]
     #swagger.parameters = [
      {
            "in": "path",
            "name": "id",
            "type": "string",
            "required": true
      }
    ]

    #swagger.requestBody = {
      required: true,
         "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "productId": {
                    "type": "integer"
                  }
                },
                "example": {
                  "name": "Coca-cola",
                  "productId": 1
                }
              }
            }
          }
    }

     #swagger.responses[404] = {
      "description": "Marca não encontrada."
    }
    #swagger.responses[500] = {
      "description": "Erro interno!"
    }
    #swagger.responses[200] = {
      "description": "Marca atualizada com sucesso!"
    }

  */
);

brandRoutes.delete(
  "/:id",
  loginRequired,
  brandsController.deleteBrand
  /* 
    #swagger.summary = "Deleta uma Marca!"
    #swagger.description = "Essa rota é responsável por deletar uma Marca!"
    #swagger.tags = ['Brands']
     #swagger.security = [{
      "bearerAuth": []
    }]
     #swagger.parameters = [
      {
            "in": "path",
            "name": "id",
            "type": "string",
            "required": true
      }
    ]
    
    #swagger.responses[200] = {
       "description": "Marca deletada com sucesso!"
    }
    #swagger.responses[500] = {
       "description": "Erro interno!"
    }
  */
);

export { brandRoutes };
