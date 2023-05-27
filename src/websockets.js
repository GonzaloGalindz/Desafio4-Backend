import { ProductManager } from "./utils.js";
const productManager = new ProductManager("products");

export default (io) => {
  io.on("connection", (socket) => {
    console.log(`New Client Connection with ID: ${socket.id}`);
    socket.on("new-product", async (newProd) => {
      try {
        await productManager.addProduct({ ...newProd });
        // Actualizando lista despues de agregar producto nuevo
        const productsList = await productManager.getProducts();

        io.emit("products", productsList);
      } catch (error) {
        console.log(error);
      }
    });
  });
};
