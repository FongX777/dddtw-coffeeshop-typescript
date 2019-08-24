import { EntityId } from '../EntityId';
export interface IDomainEvent {
  occuredDate: Date;
  getAggregateId(): EntityId<unknown>;
}
