import { ItemCategory } from '../../../domain/inventory';
export interface InventoryDto {
  id: string;
  qty: number;
  item: InventoryItemDto;
}

export interface InventoryItemDto {
  name: string;
  category: ItemCategory;
  price: number;
  sku?: string;
  manufacturer?: string;
  inboundUnitName?: string;
  capacity?: number;
}
