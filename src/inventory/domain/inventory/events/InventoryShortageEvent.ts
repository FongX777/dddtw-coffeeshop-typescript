import { InventoryId } from '..';
import { DomainEvent } from '../../../../lib/domain';

export class InventoryShortageEvent extends DomainEvent {
  constructor(readonly inventoryId: InventoryId) {
    super();
    this.inventoryId = inventoryId;
  }
}
