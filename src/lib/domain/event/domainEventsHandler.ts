import { DomainEvent } from './DomainEvent';
import { AggregateRoot } from '../AggregateRoot';
import { EntityId } from '../EntityId';

type CallbackFunctionType = (event: DomainEvent) => void;

class DomainEventsHandler {
  private static instance: DomainEventsHandler;
  private handlersMap: {
    [index: string]: CallbackFunctionType[];
  };

  private constructor() {
    this.handlersMap = {};
  }

  static getInstance() {
    if (!DomainEventsHandler.instance) {
      DomainEventsHandler.instance = new DomainEventsHandler();
    }
    return DomainEventsHandler.instance;
  }

  private markedAggregates: AggregateRoot<any>[] = [];

  /**
   * @method markAggregateForDispatch
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */
  markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatch(event)
    );
  }

  private removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>
  ): void {
    const index = this.markedAggregates.findIndex(a => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private findMarkedAggregateByID(
    id: EntityId<unknown>
  ): AggregateRoot<any> | undefined {
    let found: AggregateRoot<any> | undefined;
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }

  dispatchEventsForAggregate(id: EntityId<unknown>): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  register(
    callback: (event: DomainEvent) => void,
    eventClassName: string
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  clearHandlers(): void {
    this.handlersMap = {};
  }

  clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private dispatch(event: DomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: CallbackFunctionType[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }
}

const domainEventsHandler = DomainEventsHandler.getInstance();
export { domainEventsHandler };
