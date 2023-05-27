import express from "express";
import { CartManager } from "../utils.js";

export const routerCarts = express.Router();
const cart = new CartManager();

routerCarts.get("/:cid", async (req, res) => {
  const idCart = Number(req.params.cid);
  try {
    const cartManager = await cart.getCart(idCart);
    if (cartManager.data.length > 0) {
      res.status(200).json({
        status: "success",
        msg: "cart sended",
        data: getCart.data,
      });
    } else {
      res.status(404).json({
        status: "error not found",
        msg: getCart.error,
        data: {},
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error not found",
      msg: getCart.error,
      data: {},
    });
  }
});
routerCarts.post("/", async (req, res) => {
  try {
    const cartManager = await cart.createNewCart();
    if (cartManager.data.length > 0) {
      return res.status(200).json({
        status: "success",
        msg: "cart created",
        data: cartManager.data,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "error",
      msg: "cannot add new cart",
      data: {},
    });
  }
});
routerCarts.post("/:cid/products/:pid", async (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);
  try {
    const cartManager = await cart.addToCart(cartId, productId);

    if (cartManager.data.length > 0) {
      return res.status(200).json({
        status: "success",
        msg: "product added to cart",
        data: cartManager.data,
      });
    } else {
      return res.json({
        status: "error",
        msg: cartManager.error,
        data: cartManager.data,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "error",
      msg: "cannot add to cart",
      data: {},
    });
  }
});
