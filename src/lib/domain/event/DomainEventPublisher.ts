import { DomainEvent } from './DomainEvent';
import { EntityId } from '../EntityId';
import { AggregateRoot } from '../AggregateRoot';

type DomainEventHandler<T> = (event: T) => void;

export class DomainEventPublisher {
  private static instance: DomainEventPublisher;
  private handlersMap: {
    [index: string]: Array<DomainEventHandler<DomainEvent>>; // a event can have many subscribers
  };

  private constructor() {
    this.handlersMap = {};
  }

  static getInstance(): DomainEventPublisher {
    if (!DomainEventPublisher.instance) {
      DomainEventPublisher.instance = new DomainEventPublisher();
    }
    return DomainEventPublisher.instance;
  }

  register<T extends DomainEvent>(
    eventClassName: string,
    eventHandler: DomainEventHandler<T>
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [
        eventHandler as DomainEventHandler<DomainEvent>,
      ];
    } else {
      this.handlersMap[eventClassName].push(eventHandler as DomainEventHandler<
        DomainEvent
      >);
    }
  }

  publishForAggregate<Id extends EntityId<unknown>, Props>(
    aggregate: AggregateRoot<Id, Props>
  ): void {
    const events = aggregate.domainEvents;
    this.publishAll(events);
    aggregate.clearEvents();
  }

  clearHandlers(): void {
    this.handlersMap = {};
  }

  private publish(event: DomainEvent): void {
    const eventClassName: string = event.constructor.name;
    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: Array<DomainEventHandler<DomainEvent>> = this.handlersMap[
        eventClassName
      ];
      for (const handler of handlers) {
        handler(event);
      }
    }
  }

  private publishAll(events: DomainEvent[]): void {
    for (const event of events) {
      this.publish(event);
    }
  }
}
