import { InventoryDto } from './dto/InventoryDto';
import { InventoryRepository, InventoryId } from '../../domain/inventory';
import { toInventoryDto } from './dto/mapper';

export interface OutboundInput {
  id: string;
  amount: number;
}
export interface OutboundOutput {
  inventory: InventoryDto;
}
export class Outbound {
  constructor(private inventoryRepo: InventoryRepository) {
    this.inventoryRepo = inventoryRepo;
  }

  async execute(input: OutboundInput): Promise<OutboundOutput> {
    const id = new InventoryId(input.id);
    const inventory = await this.inventoryRepo.getById(id);
    if (inventory === undefined) {
      throw new Error('');
    }

    inventory.outbound(input.amount);
    await this.inventoryRepo.save(inventory);

    return {
      inventory: toInventoryDto(inventory),
    };
  }
}
