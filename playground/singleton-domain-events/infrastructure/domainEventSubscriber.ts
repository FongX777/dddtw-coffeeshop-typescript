import { DomainEvent } from '../domainEvent';
export interface DomainEventSubscriber<Event extends DomainEvent> {
  handleEvent: (event: Event) => void;
  eventClassName: string;
}
