import { Subjects } from "./subjects";

export interface OrderCancelledEvent {
  status: Subjects.OrderCancelled;
  data: {
    id: string;
    ticket: {
      id: string;
    };
  };
}
