import { EntityId } from '../EntityId';
import { AggregateRoot } from '../AggregateRoot';

class TestEntityId extends EntityId<string> {}
interface TestEntityProps {}
class TestAggregateRoot extends AggregateRoot<TestEntityId, TestEntityProps> {
  static create(id: TestEntityId) {
    return new TestAggregateRoot(id, {});
  }
}

describe('Aggregate Root', () => {
  it('should be created', () => {
    const testEntityId = new TestEntityId('123456');
    const testAggregateRoot = TestAggregateRoot.create(testEntityId);

    expect(testAggregateRoot.id.equals(testEntityId)).toBeTruthy();
  });
});
