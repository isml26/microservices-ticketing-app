import { Router } from "express"
import { createTicketRouter } from "./routes/new";

export const routes = Router();

routes.use("/tickets", [
    createTicketRouter,
]);