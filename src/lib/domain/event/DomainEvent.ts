import { EntityId } from '../EntityId';
export interface DomainEvent {
  occuredDate: Date;
  aggregateId: EntityId<unknown>;
}
