import express from "express";
import { ProductManager } from "../utils.js";

export const routerIndex = express.Router();
const productManager = new ProductManager();

routerIndex.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts;
    return res.render("index", { products: products });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "error", data: {} });
  }
});
