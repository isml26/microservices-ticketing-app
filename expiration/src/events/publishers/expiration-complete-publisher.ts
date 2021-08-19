import { Subjects,Publisher,ExpirationCompleteEvent } from "@ig26tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}