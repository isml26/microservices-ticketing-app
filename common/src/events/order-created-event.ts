import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

//we are going to convert date object to json or into string
export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
