import uuidv4 from 'uuid/v4';

import { InventoryRepository } from '../../../domain/inventory/inventoryRepository';
import { Inventory, InventoryId } from '../../../domain/inventory/index';

export class InMemoryInventoryRepository implements InventoryRepository {
  inventories: Inventory[];
  constructor() {
    this.inventories = [];
  }

  nextId(): InventoryId {
    return new InventoryId(uuidv4());
  }

  async exist(id: InventoryId): Promise<boolean> {
    return this.inventories.some(inventory => inventory.id.equals(id));
  }

  async getById(id: InventoryId): Promise<Inventory | undefined> {
    return this.inventories.find(inventory => inventory.id.equals(id));
  }

  async save(entity: Inventory): Promise<void> {
    if (this.exist(entity.id)) {
      const index = this.inventories.findIndex(inv => inv.id.equals(entity.id));
      this.inventories.splice(index, 1, entity);
      return;
    }
    this.inventories.push(entity);
  }

  async remove(id: InventoryId): Promise<void> {
    if (this.exist(id)) {
      const index = this.inventories.findIndex(inv => inv.id.equals(id));
      this.inventories.splice(index, 1);
      return;
    }
  }
}
