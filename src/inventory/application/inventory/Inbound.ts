import { InventoryDto } from './dto/InventoryDto';
import { InventoryRepository, InventoryId } from '../../domain/inventory';
import { toInventoryDto } from './dto/mapper';

export interface InboundInput {
  id: string;
  amount: number;
}
export interface InboudOutput {
  inventory: InventoryDto;
}
export class Inboud {
  constructor(private inventoryRepo: InventoryRepository) {
    this.inventoryRepo = inventoryRepo;
  }

  async execute(input: InboundInput): Promise<InboudOutput> {
    const id = new InventoryId(input.id);
    const inventory = await this.inventoryRepo.getById(id);
    if (inventory === undefined) {
      throw new Error('');
    }

    inventory.inbound(input.amount);
    await this.inventoryRepo.save(inventory);

    return {
      inventory: toInventoryDto(inventory),
    };
  }
}
