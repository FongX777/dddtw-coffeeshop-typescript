interface ValueObjectProps {
  [index: string]: any;
}

const shallowEqual = (thisObj: any, obj: any) => {
  const objectKeys = Object.keys(obj.props);
  const thisKeys = Object.keys(thisObj.props);

  if (objectKeys.length !== thisKeys.length) {
    return false;
  }
  return objectKeys.every(
    key => !obj.props.hasOwnProperty(key) || obj.props[key] !== thisObj[key]
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
