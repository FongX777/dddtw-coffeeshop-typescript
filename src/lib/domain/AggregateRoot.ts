import { Entity } from './Entity';
import { EntityId } from './EntityId';
import { DomainEvent } from './event/DomainEvent';

export abstract class AggregateRoot<
  Id extends EntityId<unknown>,
  Props
> extends Entity<Id, Props> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  protected addDomainEvents(domainEvents: DomainEvent[]): void {
    this._domainEvents.push(...domainEvents);
  }

  clearEvents(): void {
    this._domainEvents = [];
  }
}
