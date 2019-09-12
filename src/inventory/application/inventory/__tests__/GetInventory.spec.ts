import {
  Inventory,
  InventoryId,
  InventoryItem,
  ItemCategory,
} from '../../../domain/inventory';
import { InMemoryInventoryRepository } from '../../../infrasture/repository/inventory/InMemoryInventoryRepository';
import { GetInventory, GetInventoryInput } from '../GetInventory';

describe('Add inventory', () => {
  const getDefaultParams = () => {
    return {
      id: new InventoryId('1234'),
      qty: 10,
      maxQty: 50,
      shortageQtyThreshold: 0.3,
      item: InventoryItem.create({
        name: 'Milk',
        category: ItemCategory.Milk,
        price: 100,
        inboundUnitName: 'bottle',
        capacity: 2000,
      }),
    };
  };
  describe('Given an inventory to be created', () => {
    const inventoryRepo = new InMemoryInventoryRepository();
    const id = inventoryRepo.nextId();
    beforeEach(async () => {
      const params = getDefaultParams();
      params.id = id;
      const newInventory = Inventory.create(params);
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
