import { Router } from "express";
import { createPaymentRouter } from "./routes/createPayment";

export const routes = Router();

routes.use("/payments", [
    createPaymentRouter
]);
