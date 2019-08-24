interface ValueObjectProps {
  [index: string]: any;
}

const shallowEqual = (obj1: any, obj2: any) => {
  const objectKeys = Object.keys(obj2.props);
  const thisKeys = Object.keys(obj1.props);

  if (objectKeys.length !== thisKeys.length) {
    return false;
  }
  return objectKeys.every(
    key =>
      !obj2.props.hasOwnProperty(key) || obj2.props[key] !== obj1.props[key]
  );
};

export class ValueObject<Props extends ValueObjectProps> {
  props: Readonly<Props>;

  constructor(props: Props) {
    this.props = Object.freeze(props);
  }

  /**
   * Check equality by shallow equals of properties.
   * It can be override.
   */
  equals(obj?: ValueObject<Props>): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }
    if (obj.props === undefined) {
      return false;
    }
    return shallowEqual(this, obj);
  }
}
