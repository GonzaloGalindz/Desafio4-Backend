import express from "express";
import { __dirname } from "./utils.js";
import { routerProducts } from "./routes/products.router.js";
import { routerCarts } from "./routes/carts.router.js";
import { routerIndex } from "./routes/index.router.js";
import { routerRealTimeProducts } from "./routes/realTimeProducts.router.js";
import http from "http";
import { Server } from "socket.io";
// import { SocketServer } from "socket.io";
// import { HttpServer } from "http";
import handlebars from "express-handlebars";
import websockets from "./websockets.js";

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = new Server(server);

// CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/", routerIndex);
app.use("/realtimeproducts", routerRealTimeProducts);
app.get("*", (req, res) =>
  res.status(404).send("<h3>We cannot access the requested route</h3>")
);

const serverConnected = server.listen(port, () =>
  console.log("Server in the port: " + port)
);
serverConnected.on("error", (error) => console.log("Server error: " + error));

websockets(io);
