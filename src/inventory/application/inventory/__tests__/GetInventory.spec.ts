import {
  Inventory,
  InventoryItem,
  ItemCategory,
} from '../../../domain/inventory';
import { InMemoryInventoryRepository } from '../../../infrasture/repository/inventory/InMemoryInventoryRepository';
import { GetInventory, GetInventoryInput } from '../GetInventory';

describe('Add inventory', () => {
  describe('Given an inventory to be created', () => {
    const inventoryRepo = new InMemoryInventoryRepository();
    const id = inventoryRepo.nextId();
    beforeEach(async () => {
      const newInventory = Inventory.create({
        id,
        qty: 10,
        item: new InventoryItem({
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
      const input: GetInventoryInput = { id: id.toValue() };
      const svc = new GetInventory(inventoryRepo);
      const output = await svc.execute(input);
      expect(output.inventory.id).toBe(id.toValue());
    });
  });
});
