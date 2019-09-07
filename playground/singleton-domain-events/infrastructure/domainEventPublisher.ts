import { DomainEventSubscriber } from './domainEventSubscriber';
import { DomainEvent } from '../domainEvent';

export class DomainEventPublisher {
  private static instance: DomainEventPublisher;
  private subscribers: DomainEventSubscriber<DomainEvent>[];

  private constructor() {
    this.subscribers = [];
  }

  static getInstance() {
    if (!DomainEventPublisher.instance) {
      DomainEventPublisher.instance = new DomainEventPublisher();
    }
    return DomainEventPublisher.instance;
  }

  public subscribe<E extends DomainEvent>(
    subscriber: DomainEventSubscriber<E>
  ): void {
    this.subscribers.push(subscriber);
  }

  publish(event: DomainEvent): void {
    const eventClassName: string = event.constructor.name;
    for (const subscriber of this.subscribers) {
      if (subscriber.eventClassName === eventClassName) {
        subscriber.handleEvent(event);
      }
    }
  }

  publishAll(events: DomainEvent[]): void {
    for (const event of events) {
      this.publish(event);
    }
  }
}
