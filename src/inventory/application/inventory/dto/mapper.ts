import { InventoryDto } from './InventoryDto';
import { Inventory } from '../../../domain/inventory';

export function toInventoryDto(inventory: Inventory): InventoryDto {
  return {
    id: inventory.id.toValue(),
    qty: inventory.qty,
    item: { ...inventory.item.props },
  };
}
