import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app";
import { Order } from "../../../models/order";
import { OrderStatus } from "@ig26tickets/common";
import { stripe } from "../../../stripe";
import { Payment } from "../../../models/payment";

jest.mock("../../../stripe");

it("returns 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin())
    .send({
      token: "asda",
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns 401 when purchasing an order that does not belong the user", async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin())
    .send({
      token: "asda",
      orderId: order.id,
    })
    .expect(401);
});

it("returns 400 purchasing a cancelled order", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Cancelled,
    userId,
    version: 0,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin(userId))
    .send({
      orderId: order.id,
      token: "asdas",
    })
    .expect(400);
});

it("returns a 201 with valid inputs", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
    userId,
    version: 0,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin(userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);
    //to make sure call that stripe library with a correct set of artuments
    const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
    const chargeResult = await (stripe.charges.create as jest.Mock).mock.results[0].value;

    expect(chargeOptions.source).toEqual('tok_visa');
    expect(chargeOptions.amount).toEqual(order.price * 100);
    expect(chargeOptions.currency).toEqual('usd');

    const payment = await Payment.findOne({
      orderId: order.id,
      stripeId: chargeResult.id,
    });

    expect(payment).toBeDefined();
    expect(payment!.orderId).toEqual(order.id);
    expect(payment!.stripeId).toEqual(chargeResult.id);
});
