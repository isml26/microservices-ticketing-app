import { Publisher, OrderCreatedEvent, Subjects } from "@ig26tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
