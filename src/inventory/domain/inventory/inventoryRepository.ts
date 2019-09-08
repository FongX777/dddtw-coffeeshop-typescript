import { InventoryId, Inventory } from './index';
import { Repository } from '../../../lib/domain';

export interface InventoryRepository
  extends Repository<InventoryId, Inventory> {}
