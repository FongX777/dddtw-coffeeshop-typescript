import {
  Inventory,
  InventoryItem,
  ItemCategory,
} from '../../../domain/inventory';
import { InMemoryInventoryRepository } from '../../../infrasture/repository/inventory/InMemoryInventoryRepository';
import { Outbound, OutboundOutput, OutboundInput } from '../Outbound';

describe('Add inventory', () => {
  describe('Given an inventory to be created', () => {
    const inventoryRepo = new InMemoryInventoryRepository();
    const id = inventoryRepo.nextId();
    beforeEach(async () => {
      const newInventory = Inventory.create({
        id,
        qty: 10,
        maxQty: 50,
        shortageQtyThreshold: 0.3,
        item: InventoryItem.create({
          name: 'milk',
          category: ItemCategory.Milk,
          sku: '123',
          price: 1000,
          manufacturer: '123',
          inboundUnitName: 'lt',
          capacity: 20,
        }),
      });
      await inventoryRepo.save(newInventory);
    });
    it('should be created', async () => {
      const input: OutboundInput = { id: id.toValue(), amount: 5 };
      const svc = new Outbound(inventoryRepo);
      const output: OutboundOutput = await svc.execute(input);
      expect(output.inventory.id).toBe(id.toValue());
      expect(output.inventory.qty).toBe(5);
    });
  });
});
