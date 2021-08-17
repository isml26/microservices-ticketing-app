import { Publisher, OrderCancelledEvent, Subjects } from "@ig26tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
