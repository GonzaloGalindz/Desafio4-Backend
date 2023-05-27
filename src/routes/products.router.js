import express from "express";
import { ProductManager } from "../utils.js";

export const routerProducts = express.Router();
routerProducts.get("/", async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    try {
      const productManager = new ProductManager("../../products.json");
      const products = await productManager.getProducts();

      return res.status(200).json({
        status: "success",
        msg: "te paso todos los productos",
        data: products,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    limit = parseInt(limit);
    try {
      const productManager = new ProductManager("../../products.json");
      const products = await productManager.getProducts();
      const products_limit = [];

      for (let i = 0; i < products.length; i++) {
        if (i < limit) {
          products_limit.push(products[i]);
        }
      }

      return res.status(200).json({
        status: "success",
        msg: "te paso todos los productos filtrados",
        data: products_limit,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

routerProducts.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const productManager = new ProductManager("../../products.json");
    const product = await productManager.getProductById(parseInt(id));

    return res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).send(error);
  }
});
