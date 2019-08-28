import { DomainEvent } from './DomainEvent';

export interface IHandle<IDomainEvent> {
  setupSubscriptions(): void;
}
