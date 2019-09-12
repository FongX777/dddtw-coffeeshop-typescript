import { AggregateRoot, EntityId } from '../../../lib/domain';
import { InventoryItem } from './InventoryItem';

export class InventoryId extends EntityId<string> {}
interface InventoryProps {
  qty: number;
  maxQty: number;
  shortageQtyThreshold: number;
  item: InventoryItem;
}

export class Inventory extends AggregateRoot<InventoryId, InventoryProps> {
  get qty(): number {
    return this.props.qty;
  }
  get maxQty(): number {
    return this.props.maxQty;
  }
  get shortageQtyThreshold(): number {
    return this.props.shortageQtyThreshold;
  }
  get item(): InventoryItem {
    return this.props.item;
  }

  private static build(id: InventoryId, props: InventoryProps): Inventory {
    if (props.qty < 0) {
      throw new Error('Qty should greater than 0');
    }
    if (props.maxQty < 1) {
      throw new Error('Max Qty should greater than 1');
    }
    if (props.qty > props.maxQty) {
      throw new Error('Max Qty should greater than Qty');
    }
    if (props.shortageQtyThreshold > 1) {
      throw new Error('Qty Shortage Threshold should less than 1');
    }
    return new Inventory(id, props);
  }

  static create(params: {
    id: InventoryId;
    qty: number;
    maxQty: number;
    shortageQtyThreshold: number;
    item: InventoryItem;
  }) {
    return Inventory.build(params.id, {
      qty: params.qty,
      maxQty: params.maxQty,
      shortageQtyThreshold: params.shortageQtyThreshold,
      item: params.item,
    });
  }

  inbound(amount: number): void {
    if (amount < 0) {
      throw new Error('amount can not be negative digital');
    }
    if (this.qty + amount > this.props.maxQty) {
      throw new Error('OverQtyLimitationException(amount');
    }

    this.props.qty += amount;
    // this.ApplyEvent(new Inbounded(this.Id, amount, this.Qty));
  }

  outbound(amount: number): void {
    if (amount < 0) {
      throw new Error('amount can not be negative digital');
    }
    if (this.props.qty - amount < 0) {
      throw new Error('Qty Not Enough');
    }

    this.props.qty -= amount;

    const qtyShortageThreshold = 0.3;

    if (this.props.qty < Math.ceil(this.props.maxQty * qtyShortageThreshold)) {
      // publish a InventoryShortageEvent
    }
  }
}
