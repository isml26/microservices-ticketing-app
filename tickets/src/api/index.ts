import { Router } from "express"
import { createTicketRouter } from "./routes/createTicket";
import { showTicketRouter } from "./routes/show";
import { getAllTickets } from "./routes/getAllTickets";
import { updateTicket } from "./routes/updateTicket";
export const routes = Router();

routes.use("/tickets", [
    createTicketRouter,
    showTicketRouter,
    getAllTickets,
    updateTicket,
]);