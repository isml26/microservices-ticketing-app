import express, { Request, Response } from "express";
import { Ticket } from "../../models/ticket";
import { NotFoundError,validateRequest } from "@ig26tickets/common";
import { param } from 'express-validator';
import { Types as MongooseTypes } from 'mongoose';
const router = express.Router();

router.get(
  '/:id',
  // param('id')
  //   .custom((idValue) => MongooseTypes.ObjectId.isValid(idValue))
  //   .withMessage('id must be a valid MongoDB ObjectId'),
  // validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
 
    if (!ticket) {
      throw new NotFoundError();
    }
 
    res.send(ticket);
  }
);
 
export { router as showTicketRouter };