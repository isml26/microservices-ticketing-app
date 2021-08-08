import { Publisher, Subjects, TicketCreatedEvent } from "@ig26tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
