import { DomainEvent } from './DomainEvent';
import { AggregateRoot } from '../AggregateRoot';
import { EntityId } from '../EntityId';

type CallbackFunctionType = (event: DomainEvent) => void;

class DomainEventsHandler<Id extends EntityId<unknown>, Props> {
  // private static instance: DomainEventsHandler<unknown>;
  private handlersMap: {
    [index: string]: CallbackFunctionType[];
  };

  constructor() {
    this.handlersMap = {};
  }

  // static getInstance() {
  //   if (!DomainEventsHandler.instance) {
  //     DomainEventsHandler.instance = new DomainEventsHandler();
  //   }
  //   return DomainEventsHandler.instance;
  // }

  private markedAggregates: Array<AggregateRoot<Id, Props>> = [];

  /**
   * @method markAggregateForDispatch
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */
  markAggregateForDispatch(aggregate: AggregateRoot<Id, Props>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private dispatchAggregateEvents(aggregate: AggregateRoot<Id, Props>): void {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatch(event)
    );
  }

  private removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<Id, Props>
  ): void {
    const index = this.markedAggregates.findIndex(a => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private findMarkedAggregateByID(
    id: EntityId<unknown>
  ): AggregateRoot<Id, Props> | undefined {
    let found: AggregateRoot<Id, Props> | undefined;
    for (const aggregate of this.markedAggregates) {
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
      for (const handler of handlers) {
        handler(event);
      }
    }
  }
}

// const domainEventsHandler = DomainEventsHandler.getInstance();
const domainEventsHandler = new DomainEventsHandler();
export { domainEventsHandler };
