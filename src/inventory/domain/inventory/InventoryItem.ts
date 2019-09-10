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
  category: ItemCategory;
  price: number;
  sku: string;
  manufacturer: string;
  inboundUnitName: string;
  capacity: number;
}

export class InventoryItem extends ValueObject<InventoryItemProps> {
  private static build(params: InventoryItemProps): InventoryItem {
    return new InventoryItem(params);
  }

  static create(params: {
    name: string;
    category: ItemCategory;
    price: number;
    sku?: string;
    manufacturer?: string;
    inboundUnitName?: string;
    capacity?: number;
  }): InventoryItem {
    return InventoryItem.build({
      name: params.name,
      sku: params.sku || '',
      price: params.price,
      manufacturer: params.manufacturer || '',
      category: ItemCategory.Milk,
      inboundUnitName: params.inboundUnitName || '',
      capacity: params.capacity || 0,
    });
  }
}
