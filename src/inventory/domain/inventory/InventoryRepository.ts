import { InventoryId, Inventory } from './Inventory';
import { Repository } from '../../../lib/domain';

export interface InventoryRepository
  extends Repository<InventoryId, Inventory> {}
