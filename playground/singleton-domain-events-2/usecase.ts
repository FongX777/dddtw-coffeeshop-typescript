import { OrderClosed } from './orderClosed';
import { OrderRepository } from './repository';

import { DomainEventPublisher } from './infrastructure/domainEventPublisher';
export class CloseOrder {
  orderRepo: OrderRepository;
  constructor(orderRepo: OrderRepository) {
    this.orderRepo = orderRepo;
  }

  execute(orderId: string) {
    DomainEventPublisher.getInstance().register(
      OrderClosed.name,
      this.onClosed.bind(this)
    );

    const order = this.orderRepo.getById(orderId);
    order.close();
  }

  onClosed(event: OrderClosed) {
    const orderId = event.id;
    console.log(`Order ${orderId} closed.`);
    // do other things...
  }
}
