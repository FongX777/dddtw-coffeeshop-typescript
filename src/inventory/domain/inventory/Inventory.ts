import { AggregateRoot, EntityId } from '../../../lib/domain';
import { InventoryItem } from './InventoryItem';

export class InventoryId extends EntityId<string> {}
interface InventoryProps {
  qty: number;
  item: InventoryItem;
}

export class Inventory extends AggregateRoot<InventoryId, InventoryProps> {
  get qty(): number {
    return this.props.qty;
  }
  get item(): InventoryItem {
    return this.props.item;
  }

  private static build(id: InventoryId, props: InventoryProps): Inventory {
    if (props.qty < 0) {
      throw new Error('Qty should greater than 0');
    }
    return new Inventory(id, props);
  }

  static create(params: { id: InventoryId; qty: number; item: InventoryItem }) {
    return Inventory.build(params.id, {
      qty: params.qty,
      item: params.item,
    });
  }
}
