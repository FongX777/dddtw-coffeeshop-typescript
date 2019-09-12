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
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
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

  static create(params: {
    id: string;
    name: string;
    email: string;
  }): TestEntity {
    return new TestEntity(new TestEntityId(params.id), {
      name: params.name,
      email: params.email,
    });
  }
}

describe('Entity', () => {
  const name = 'test';
  const email = 'test@mail.com';
  const idValue = '123456';
  const testEntityId = new TestEntityId(idValue);
  const testEntity = TestEntity.create({ id: idValue, name, email });

  it('should be created with correct values', () => {
    expect(testEntity.id.equals(testEntityId)).toBeTruthy();
  });

  it('should be mutable', () => {
    const newName = 'test2';
    const newEmail = 'test2@mail.com';
    testEntity.changeAll({
      name: newName,
      email: newEmail,
    });
    const receviedProps = testEntity.getProps();
    expect(receviedProps.name).toBe(newName);
    expect(receviedProps.email).toBe(newEmail);
  });

  it('should have equality', () => {
    const testEntity = TestEntity.create({ id: idValue, name, email });
    const testEntityWithDifferentId = TestEntity.create({
      id: '654321',
      name,
      email,
    });

    expect(testEntity.equals(testEntity)).toBeTruthy();
    expect(testEntityWithDifferentId.equals(testEntity)).toBeFalsy();
    expect(testEntity.equals()).toBeFalsy();
  });
});
