import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  //second arg is client id
  url: "http://localhost:4222",
}); //client that we are using to connect nats streaming server

//this function will be executed after the client has successfully connected to the nats streaming server
stan.on("connect", async () => {
  console.log("Publisher connected to nats");

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (err) {
    console.error(err)
  }

  // const data = JSON.stringify({
  //     id: '123',
  //     title: 'concert',
  //     price: 20,
  // });
  // stan.publish('ticket:created',data,()=>{
  //     console.log('Event Published');
  // })
});
