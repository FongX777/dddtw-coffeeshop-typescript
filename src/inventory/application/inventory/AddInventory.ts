import { Inventory } from '../../domain/inventory/index';
import { InventoryItem } from '../../domain/inventory/InventoryItem';
import { InventoryRepository } from '../../domain/inventory/inventoryRepository';

export interface AddInventoryInput {
  qty: number;
  item: InventoryItem;
}

export interface AddInventoryOutput {
  inventory: Inventory;
}

export class AddInventory {
  private readonly inventoryRepo: InventoryRepository;
  constructor(inventoryRepo: InventoryRepository) {
    this.inventoryRepo = inventoryRepo;
  }

  async execute(input: AddInventoryInput): Promise<AddInventoryOutput> {
    const inventoryId = this.inventoryRepo.nextId();
    const inventory = Inventory.create({
      id: inventoryId,
      qty: input.qty,
      item: input.item,
    });

    this.inventoryRepo.save(inventory);

    return { inventory };
  }
}
