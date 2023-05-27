import express from "express";
import { ProductManager } from "../utils.js";

export const routerRealTimeProducts = express.Router();
const productManager = new ProductManager();

routerRealTimeProducts.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts;
    return res.render("realTimeProducts", { products: products });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "error", data: {} });
  }
});
