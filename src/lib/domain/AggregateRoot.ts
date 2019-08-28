import { Entity, EntityProps } from './Entity';
import { DomainEvent } from './event/DomainEvent';
import { domainEventsHandler } from './event/domainEventsHandler';
import { EntityId } from './EntityId';

export abstract class AggregateRoot<
  Props extends EntityProps<EntityId<unknown>>
> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    domainEventsHandler.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name
    );
  }
}
