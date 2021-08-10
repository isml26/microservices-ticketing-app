import { Router } from "express";
import { createOrderRouter } from "./routes/createOrder";
import { deleteOrderRouter } from "./routes/deleteOrder";
import { getAllOrdersRouter } from "./routes/getAllOrders";
import { showOrderRouter } from "./routes/showOrder";

export const routes = Router();

routes.use("/orders", [
  createOrderRouter,
  deleteOrderRouter,
  getAllOrdersRouter,
  showOrderRouter,
]);
