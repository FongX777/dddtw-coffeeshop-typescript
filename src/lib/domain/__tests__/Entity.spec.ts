import { EntityId } from '../EntityId';
import { Entity } from '../Entity';

class TestEntityId extends EntityId<string> {}
interface TestEntityProps {
  name: string;
  email: string;
}

class TestEntity extends Entity<TestEntityId, TestEntityProps> {
  changeAll(params: { name: string; email: string }) {
    this.setName(params.name);
    this.setEmail(params.email);
  }
  private setName(name: string): void {
    if (name === '') {
      throw new Error('');
    }
    this.props.name = name;
  }
  private setEmail(email: string): void {
    if (email === '' || !email.includes('@')) {
      throw new Error('');
    }
    this.props.email = email;
  }
}

describe('Entity', () => {
  const name = 'test';
  const email = 'test@mail.com';
  const testEntityId = new TestEntityId('123456');
  const testEntity = new TestEntity(testEntityId, {
    name,
    email,
  });

  it('should be created with correct values', () => {
    expect(testEntity.id).toBe(testEntityId);
  });

  it('should be mutable', () => {
    const newName = 'test2';
    const newEmail = 'test2@mail.com';
    testEntity.changeAll({
      name: newName,
      email: newEmail,
    });
    const receviedProps = testEntity.getProps();
    expect(receviedProps).toEqual({
      name: newName,
      email: newEmail,
    });
  });
});
