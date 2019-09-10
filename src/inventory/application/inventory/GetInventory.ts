import {
  InventoryRepository,
  InventoryId,
  Inventory,
} from '../../domain/inventory/';
import { InventoryDto } from './dto/InventoryDto';
import { toInventoryDto } from './dto/mapper';

export interface GetInventoryInput {
  id: string;
}

export interface GetInventoryOutput {
  inventory: InventoryDto;
}

export class GetInventory {
  private readonly inventoryRepo: InventoryRepository;
  constructor(inventoryRepo: InventoryRepository) {
    this.inventoryRepo = inventoryRepo;
  }

  async execute(input: GetInventoryInput): Promise<GetInventoryOutput> {
    const id = new InventoryId(input.id);
    const inventory = await this.inventoryRepo.getById(id);

    if (!(inventory instanceof Inventory)) {
      throw new Error('');
    }
    return { inventory: toInventoryDto(inventory) };
  }
}
