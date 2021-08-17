import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app";
import { Order, OrderStatus } from "../../../models/order";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";

it("marks an order as cancelled", async () => {
  //create ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "Concert",
    price: 20,
  });
  await ticket.save();
  const user = global.signin();
  //make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", await user)
    .send({ ticketId: ticket.id })
    .expect(201);
  //make request to cancel an order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", await user)
    .send()
    .expect(204);
  //expectation to make sure thing is created

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits a order cancelled event", async () => {
  //create ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "Concert",
    price: 20,
  });
  await ticket.save();
  const user = global.signin();
  //make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", await user)
    .send({ ticketId: ticket.id })
    .expect(201);
  //make request to cancel an order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", await user)
    .send()
    .expect(204);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
