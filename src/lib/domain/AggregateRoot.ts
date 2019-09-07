import { Entity } from './Entity';
import { EntityId } from './EntityId';

export abstract class AggregateRoot<
  Id extends EntityId<unknown>,
  Props
> extends Entity<Id, Props> {}
