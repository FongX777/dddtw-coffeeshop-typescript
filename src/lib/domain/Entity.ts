import { EntityId } from './EntityId';

export abstract class Entity<Id extends EntityId<unknown>, Props> {
  readonly id: Id;
  protected props: Props;

  protected constructor(id: Id, props: Props) {
    this.id = id;
    this.props = props;
  }

  /**
   * For testing usage
   */
  getProps() {
    return this.props;
  }

  equals(obj?: Entity<Id, Props>): boolean {
    if (obj == null || obj === undefined) {
      return false;
    }

    if (this === obj) {
      return true;
    }

    const isEntity = (v: unknown): v is Entity<Id, Props> => {
      return v instanceof Entity;
    };
    if (!isEntity(obj)) {
      return false;
    }

    return this.id.equals(obj.id);
  }
}
