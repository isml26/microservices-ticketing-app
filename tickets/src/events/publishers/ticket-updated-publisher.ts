import { Publisher, Subjects, TicketUpdatedEvent } from "@ig26tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

