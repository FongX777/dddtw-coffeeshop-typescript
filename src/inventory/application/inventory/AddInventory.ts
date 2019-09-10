import { Inventory, InventoryRepository } from '../../domain/inventory';
import { InventoryDto, InventoryItemDto } from './dto/InventoryDto';
import { InventoryItem } from '../../domain/inventory/InventoryItem';
import { toInventoryDto } from './dto/mapper';

export interface AddInventoryInput {
  qty: number;
  item: InventoryItemDto;
}

export interface AddInventoryOutput {
  inventory: InventoryDto;
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
      item: InventoryItem.create(input.item),
    });

    this.inventoryRepo.save(inventory);

    return { inventory: toInventoryDto(inventory) };
  }
}
