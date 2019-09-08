import { AggregateRoot, EntityId } from '../../../lib/domain';
import { InventoryItem } from './InventoryItem';

export class InventoryId extends EntityId<string> {}
interface InventoryProps {
  qty: number;
  item: InventoryItem;
}

export class Inventory extends AggregateRoot<InventoryId, InventoryProps> {
  // static build(): Inventory {}

  static create(params: { id: InventoryId; qty: number; item: InventoryItem }) {
    return new Inventory(params.id, {
      qty: params.qty,
      item: params.item,
    });
  }
}
