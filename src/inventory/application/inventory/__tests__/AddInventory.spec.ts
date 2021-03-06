import { ItemCategory } from '../../../domain/inventory/InventoryItem';
import { InMemoryInventoryRepository } from '../../../infrasture/repository/inventory/InMemoryInventoryRepository';
import { AddInventory, AddInventoryInput } from '../AddInventory';

describe('Add inventory', () => {
  describe('Given an inventory to be created', () => {
    it('should be created', async () => {
      const input: AddInventoryInput = {
        qty: 10,
        maxQty: 50,
        shortageQtyThreshold: 0.3,
        item: {
          name: 'milk',
          category: ItemCategory.Milk,
          sku: '123',
          price: 1000,
          manufacturer: '123',
          inboundUnitName: 'lt',
          capacity: 20,
        },
      };
      const svc = new AddInventory(new InMemoryInventoryRepository());

      const output = await svc.execute(input);
      expect(output.inventory).not.toBeUndefined();
    });
  });
});
