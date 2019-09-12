import { Inventory, InventoryId, InventoryItem, ItemCategory } from '../';

describe('Inventory', () => {
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

  describe('create an inventory', () => {
    it('should succeed', () => {
      const id = new InventoryId('1234');
      const qty = 10;
      const maxQty = 50;
      const shortageQtyThreshold = 0.3;
      const item = InventoryItem.create({
        name: 'Milk',
        category: ItemCategory.Milk,
        price: 100,
        inboundUnitName: 'bottle',
        capacity: 2000,
      });
      const inventory = Inventory.create({
        id,
        qty,
        maxQty,
        shortageQtyThreshold,
        item,
      });

      expect(inventory.id.equals(id)).toBeTruthy();
      expect(inventory.qty).toBe(qty);
      expect(inventory.shortageQtyThreshold).toBe(shortageQtyThreshold);
      expect(inventory.maxQty).toBe(maxQty);
      expect(inventory.item).toBe(item);
    });
  });

  describe('An inventory inbounds', () => {
    describe('Given max qty is 50', () => {
      const params = getDefaultParams();
      params.maxQty = 50;
      params.qty = 0;
      it('should inbound 50', () => {
        const actual = Inventory.create(params);
        actual.inbound(50);

        expect(actual.qty).toBe(50);
      });

      it('should not inbound over max qty', () => {
        const actual = Inventory.create(params);
        expect(() => actual.inbound(100)).toThrow();
        expect(actual.qty).toBe(0);
      });
    });
  });

  describe('An inventory outbound', () => {
    describe('Given qty is 10', () => {
      const params = getDefaultParams();
      params.qty = 10;
      it('should inbound 5', () => {
        const actual = Inventory.create(params);
        actual.outbound(5);
        expect(actual.qty).toBe(5);
      });
      it('should not outbound over current qty', () => {
        const actual = Inventory.create(params);
        expect(() => actual.outbound(20)).toThrow();
      });
    });
  });
});
