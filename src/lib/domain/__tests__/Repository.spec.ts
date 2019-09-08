import { Repository } from '../Repository';
import { EntityId } from '../EntityId';
import { AggregateRoot } from '../AggregateRoot';

class TestEntityId extends EntityId<string> {}
interface TestEntityProps {}

class TestAggregateRoot extends AggregateRoot<TestEntityId, TestEntityProps> {}

class TestRepository implements Repository<TestEntityId, TestAggregateRoot> {
  tests: TestAggregateRoot[];
  nextId(): TestEntityId {
    return new TestEntityId('');
  }
  constructor() {
    this.tests = [];
  }
  async exist(id: TestEntityId): Promise<boolean> {
    return this.tests.some(test => test.id.equals(id));
  }
  async getById(id: TestEntityId): Promise<TestAggregateRoot | undefined> {
    return this.tests.find(test => test.id.equals(id));
  }
  async save(entity: TestAggregateRoot): Promise<void> {
    if (this.exist(entity.id)) {
      const targetIndex = this.tests.findIndex(test =>
        test.id.equals(entity.id)
      );
      this.tests.splice(targetIndex, 1, entity);
    } else {
      this.tests.push(entity);
    }
  }
  async remove(id: TestEntityId): Promise<void> {
    if (this.exist(id)) {
      const targetIndex = this.tests.findIndex(test => test.id.equals(id));
      this.tests.splice(targetIndex, 1);
    }
  }
}

describe('Repository', () => {
  const idValue = '123456';
  const testEntityId = new TestEntityId(idValue);
  const testEntity = new TestAggregateRoot(testEntityId, {});
  const repo = new TestRepository();

  it('should create successfully', async () => {
    repo.save(testEntity);
    expect(repo.tests.length).toBe(1);
    const foundEntity = await repo.getById(testEntityId);
    expect(foundEntity).toBe(testEntity);
    const existed = await repo.exist(testEntityId);
    expect(existed).toBeTruthy();

    await repo.remove(testEntityId);
    expect(repo.tests.length).toBe(0);
  });
});
