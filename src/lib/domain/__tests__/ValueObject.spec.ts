import { ValueObject } from '../ValueObject';

interface TestVoProps {
  name: string;
  email: string;
}

class TestVo extends ValueObject<TestVoProps> {}

describe('Value Object', () => {
  const name = 'vo';
  const email = 'vo@mail.com';
  const testVo = new TestVo({ name, email });

  it('should be created with correct values', () => {
    expect(testVo.props.name).toBe(name);
    expect(testVo.props.email).toBe(email);
  });

  it('should be immutable', () => {
    const expectedError = new TypeError(
      `Cannot assign to read only property 'name' of object '#<Object>'`
    );
    expect(() =>
      Object.assign(testVo.props, {
        name: 'newName',
      })
    ).toThrow(expectedError);
  });

  it('should have equality', () => {
    const testVo2 = new TestVo({ name, email });
    const equaled = testVo.equals(testVo2);
    expect(equaled).toBeTruthy();
  });
});
