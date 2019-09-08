import { DomainEvent } from './DomainEvent';

export type DomainEventHandler<T extends DomainEvent> = (event: T) => void;

export class DomainEventPublisher {
  private static instance: DomainEventPublisher;
  private handlersMap: {
    [index: string]: Array<DomainEventHandler<DomainEvent>>; // a event can have many subscribers
  };

  private constructor() {
    this.handlersMap = {};
  }

  static getInstance() {
    if (!DomainEventPublisher.instance) {
      DomainEventPublisher.instance = new DomainEventPublisher();
    }
    return DomainEventPublisher.instance;
  }

  register(
    eventClassName: string,
    eventHandler: DomainEventHandler<DomainEvent>
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [eventHandler];
    } else {
      this.handlersMap[eventClassName].push(eventHandler);
    }
  }

  publish(event: DomainEvent): void {
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

  publishAll(events: DomainEvent[]): void {
    for (const event of events) {
      this.publish(event);
    }
  }
}
