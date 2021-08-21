import { Subjects,Publisher,PaymentCreatedEvent } from "@ig26tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
}