import { Router } from "express";
import { ProductsController } from "./productsController.js";

import { authorization } from "../../middlewares/authMiddlewares.js";

const router = Router();

let Controller = new ProductsController();

//* Obtener Productos

router.get("/", async (req, res, next) => {
  try {
    let productos = await Controller.getAllProducts(req);

    if (productos.status == 200) {
      return res.status(200).json(productos.response);
    } else {
      return res.status(400).json(productos.response);
    }
  } catch (error) {
    next(error);
  }
});

//* Subir producto
router.post(
  "/",
  authorization("admin","premium"),
  async (req, res, next) => {
    try {
      let result = await Controller.addProduct(req);
      if (result.status == 200) {
        return res.status(200).send(result);
      } else {
        return res.status(400).send(result.response);
      }
    } catch (error) {
      next(error);
    }
  }
);

//* Traer Productos con un id
router.get("/:pid", async (req, res, next) => {
  try {
    let result = await Controller.getProductWhitId(req.params.pid);
    if (result.status == 200) {
      return res.status(200).send(result.response);
    } else {
      return res.status(400).send(result.response);
    }
  } catch (error) {
    next(error);
  }
});

//*Actualizar productos
router.put("/:pid", authorization("admin","premium"), async (req, res, next) => {
  try {
    let result = await Controller.updateProducts(req);
    if (result.status == 200) {
      return res.status(200).send({
        status: result.status,
        response: result.response,
      });
    } else {
      return res.status(400).send(result.response);
    }
  } catch (error) {
    next(error);
  }
});

//* Eliminar productos
router.delete("/:pid", authorization("admin","premium"), async (req, res, next) => {
  try {
    let result = await Controller.deleteProducts(req);
    if (result.status == 200) {
      return res.status(200).send(result.response);
    } else {
      return res.status(400).send(result.response);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
