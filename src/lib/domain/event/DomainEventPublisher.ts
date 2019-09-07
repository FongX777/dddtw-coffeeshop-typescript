import { DomainEvent } from './DomainEvent';

type DomainEventHandler<T extends DomainEvent> = (event: T) => void;

export class DomainEventPublisher {
  private static instance: DomainEventPublisher;
  private handlersMap: {
    [index: string]: DomainEventHandler<any>[]; // a event can have many subscribers
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

  public register<T extends DomainEvent>(
    eventClassName: string,
    eventHandler: DomainEventHandler<T>
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
      const handlers: DomainEventHandler<any>[] = this.handlersMap[
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
