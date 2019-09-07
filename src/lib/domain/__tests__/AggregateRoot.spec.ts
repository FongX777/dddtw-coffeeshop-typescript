import { EntityId } from '../EntityId';
import { AggregateRoot } from '../AggregateRoot';

class TestEntityId extends EntityId<string> {}
interface TestEntityProps {}
class TestAggregateRoot extends AggregateRoot<TestEntityId, TestEntityProps> {}

describe('Aggregate Root', () => {
  it('should be created', () => {
    const testEntityId = new TestEntityId('123456');
    const testAggregateRoot = new TestAggregateRoot(testEntityId, {});

    expect(testAggregateRoot.id.equals(testEntityId)).toBeTruthy();
  });
});
