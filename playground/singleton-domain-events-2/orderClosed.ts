import { DomainEvent } from './domainEvent';
export class OrderClosed implements DomainEvent {
  id: string;
  occuredOn: Date;
  constructor(id: string) {
    this.id = id;
    this.occuredOn = new Date();
  }
}
