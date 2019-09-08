import { ValueObject } from '../../../lib/domain';

export enum ItemCategory {
  Milk,
  LowfatMilk,
  SoyMilk,
  CoffeeBean,
  FilterPaper,
}

interface InventoryItemProps {
  name: string;
  sku: string;
  price: number;
  manufacturer: string;
  itemCategory: ItemCategory;
  inboundUnitName: string;
  capacity: number;
}

export class InventoryItem extends ValueObject<InventoryItemProps> {
  static build(params: InventoryItemProps) {
    return new InventoryItem(params);
  }

  static createMilkItem(params: {
    name: string;
    sku?: string;
    price: number;
    manufacturer?: string;
    inboundUnitName?: string;
    capacity?: number;
  }): InventoryItem {
    return InventoryItem.build({
      name: params.name,
      sku: params.sku || '',
      price: params.price,
      manufacturer: params.manufacturer || '',
      itemCategory: ItemCategory.Milk,
      inboundUnitName: params.inboundUnitName || '',
      capacity: params.capacity || 0,
    });
  }
}
