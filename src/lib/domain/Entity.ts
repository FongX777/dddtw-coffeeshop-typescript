import { EntityId } from './EntityId';

export interface EntityProps<Id extends EntityId<unknown>> {
  id: Id;
  [index: string]: unknown;
}

export class Entity<Props extends EntityProps<EntityId<unknown>>> {
  protected props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  /**
   * For testing usage
   */
  getProps() {
    return this.props;
  }

  equals(obj?: Entity<Props>): boolean {
    if (obj == null || obj === undefined) {
      return false;
    }

    if (this === obj) {
      return true;
    }

    const isEntity = (v: unknown): v is Entity<Props> => {
      return v instanceof Entity;
    };
    if (!isEntity(obj)) {
      return false;
    }

    return this.id.equals(obj.id);
  }
}
