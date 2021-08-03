import { Router } from "express"
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

export const routes = Router();

routes.use("/tickets", [
    showTicketRouter,
    createTicketRouter,
]);