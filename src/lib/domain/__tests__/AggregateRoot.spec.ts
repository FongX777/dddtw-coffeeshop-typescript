import { EntityId } from '../EntityId';
import { IDomainEvent } from '../event/IDomainEvent';
import { AggregateRoot } from '../AggregateRoot';

class CreateEvent implements IDomainEvent {
  occuredDate: Date;
  aggregateId: EntityId<unknown>;
  constructor(aggregateId: EntityId<unknown>) {
    this.occuredDate = new Date();
    this.aggregateId = aggregateId;
  }
}

class TestEntityId extends EntityId<string> {}
interface TestEntityProps {}
class TestAggregateRoot extends AggregateRoot<TestEntityId, TestEntityProps> {
  static create(): TestAggregateRoot {
    const id = new TestEntityId('12345677');
    const testAggregateRoot = new TestAggregateRoot(id, {});
    testAggregateRoot.addDomainEvent(new CreateEvent(id));
    return testAggregateRoot;
  }
}

describe('Aggregate Root', () => {
  const testEntityId = new TestEntityId('123456');
  const testAggregateRoot = new TestAggregateRoot(testEntityId, {});
  const ag = TestAggregateRoot.create();
  it('should have domain events', () => {
    expect(testAggregateRoot.domainEvents.length).toBe(0);
  });

  it('should have one domain events', () => {
    expect(ag.domainEvents.length).toBe(1);
  });
});
