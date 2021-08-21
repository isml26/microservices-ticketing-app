import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from "@ig26tickets/common";
import { stripe } from "../../stripe";
import { PaymentCreatedPublisher } from "../../events/publishers/payment-created-publisher";
import { Order } from "../../models/order";
import { Payment } from "../../models/payment";
import { natsWrapper } from "../../nats-wrapper";
const router = express.Router();

router.post(
  "/",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Order cancelled cannot pay !!");
    }
    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id 
    });
    await payment.save();
    
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id:payment.id,
      orderId:payment.orderId,
      stripeId:charge.id
    });

    res.status(201).send({ id:payment.id });
  }
);

export { router as createPaymentRouter };
