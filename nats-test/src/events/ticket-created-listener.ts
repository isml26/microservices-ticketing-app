import { Message } from "node-nats-streaming";
import { Listener } from "../events/base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated ;
  queueGroupName = "payment-service";
  onMessage(data: TicketCreatedEvent['data'] , msg: Message): void {
    console.log("Event data!", data);
    
    msg.ack(); //marks message as successfully having been parsed
  }
}
