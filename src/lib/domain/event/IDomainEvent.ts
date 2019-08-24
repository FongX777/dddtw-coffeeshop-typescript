import { EntityId } from '../EntityId';
export interface IDomainEvent {
  occuredDate: Date;
  aggregateId: EntityId<unknown>;
}
