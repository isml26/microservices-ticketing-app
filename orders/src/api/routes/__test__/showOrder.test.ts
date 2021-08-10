import request from "supertest";
import { app } from "../../../app";
import { Ticket } from "../../../models/ticket";

it("fetches the order", async () => {
  //create ticket
  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });
  await ticket.save();
  const user = global.signin();
  //make a request to buld an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", await user)
    .send({ ticketId: ticket.id })
    .expect(201);
  const orderId = order.id;
  //make request to fetch the order
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${orderId}`)
    .set("Cookie", await user)
    .send()
    .expect(200);

  expect(fetchOrder.id).toEqual(orderId);
});

it("returns an error if one user tries to fetch a order that doesn't belong to the user", async () => {
    //create ticket
    const ticket = Ticket.build({
      title: "Concert",
      price: 20,
    });
    await ticket.save();
    const user = global.signin();
    const user2 = global.signin();
    //make a request to buld an order with this ticket
    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", await user)
      .send({ ticketId: ticket.id })
      .expect(201);
    const orderId = order.id;
    //make request to fetch the order
    await request(app)
      .get(`/api/orders/${orderId}`)
      .set("Cookie", await user2)
      .send()
      .expect(401);
  });
  