import { EntityId } from '../EntityId';

class TestId extends EntityId<string> {}

describe('EntityId', () => {
  const idVal = '1234567890';
  const testId = new TestId(idVal);
  it('should be created with value', () => {
    expect(testId.toValue()).toBe(idVal);
    expect(testId.occuredDate instanceof Date).toBeTruthy();
    expect(testId.toString()).toBe(
      `TestId(${idVal})-${testId.occuredDate.toISOString()}`
    );
  });

  it('should be immutable', () => {
    const expectedError = new TypeError(
      `Cannot assign to read only property 'occuredDate' of object '#<Object>'`
    );
    expect(() => {
      Object.assign(testId.props, {
        occuredDate: new Date('2019-01-01'),
      });
    }).toThrow(expectedError);
    expect(() => {
      Object.assign(testId.props, {
        value: '123412341234',
      });
    }).toThrow(
      new TypeError(
        `Cannot assign to read only property 'value' of object '#<Object>'`
      )
    );
  });
});
