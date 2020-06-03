import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@hntickets/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
