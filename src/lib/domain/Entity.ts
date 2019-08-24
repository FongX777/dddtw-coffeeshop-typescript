import { EntityId } from './EntityId';

export interface EntityProps {
  [index: string]: any;
}

export abstract class Entity<
  ID extends EntityId<unknown>,
  Props extends EntityProps
> {
  public readonly id: ID;
  protected props: Props;

  constructor(id: ID, props: Props) {
    this.id = id;
    this.props = props;
  }

  /**
   * For testing usage
   */
  public getProps() {
    return this.props;
  }

  public equals(obj?: Entity<ID, Props>): boolean {
    if (obj == null || obj == undefined) {
      return false;
    }

    if (this === obj) {
      return true;
    }

    const isEntity = (v: any, Class: any): boolean => {
      return v instanceof Class;
    };
    if (!isEntity(obj, this)) {
      return false;
    }

    return this.id.equals(obj.id);
  }
}
