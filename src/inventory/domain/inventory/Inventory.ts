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

  inbound(amount: number): void {
    if (amount < 0) {
      throw new Error('amount can not be negative digital');
    }
    // if (this.qty < amount < MAX) {
    //     throw new Error('OverQtyLimitationException(amount');
    // }

    this.props.qty += amount;
    // this.ApplyEvent(new Inbounded(this.Id, amount, this.Qty));
  }

  outbound(amount: number): void {
    if (amount < 0) {
      throw new Error('amount can not be negative digital');
    }
    if (this.qty < amount) {
      throw new Error('InventoryShortageException(amount)');
    }

    this.props.qty -= amount;
    // this.ApplyEvent(new Outbounded(this.Id, amount, this.Qty));
  }
}
