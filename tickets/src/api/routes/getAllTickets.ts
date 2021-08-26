import express, { Request, Response } from "express";
import { Ticket } from "../../models/ticket";

const router = express.Router();

router.get("/", async (req, res) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });
  res.send(tickets);
});

export { router as getAllTickets };
