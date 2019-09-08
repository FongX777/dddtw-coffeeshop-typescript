import { DomainEvent } from './DomainEvent';

export type DomainEventHandler<T> = (event: T) => void;

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
