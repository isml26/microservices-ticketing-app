import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app";
import { Order } from "../../../models/order";
import { Ticket } from "../../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "Concert",
    price: 20,
  });
  await ticket.save();
  return ticket;
};

it("fetches orders for an particular user", async () => {
  //create tree tickets
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const user1 = global.signin();
  const user2 = global.signin();
  //create order as User1
  await request(app)
    .post("/api/orders")
    .set("Cookie", await user1)
    .send({ ticketId: ticket1.id })
    .expect(201);
  //create order as User2
  const { body: order1 } = await request(app)
    .post("/api/orders")
    .set("Cookie", await user2)
    .send({ ticketId: ticket2.id })
    .expect(201);
  const { body: order2 } = await request(app)
    .post("/api/orders")
    .set("Cookie", await user2)
    .send({ ticketId: ticket3.id })
    .expect(201);
  //Make request for get orders for User2
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", await user2)
    .expect(200);
  //Make sure ony got the orders for  User2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(order1.id);
  expect(response.body[1].id).toEqual(order2.id);
  expect(response.body[0].ticket.id).toEqual(ticket2.id);
  expect(response.body[1].ticket.id).toEqual(ticket3.id);
});
