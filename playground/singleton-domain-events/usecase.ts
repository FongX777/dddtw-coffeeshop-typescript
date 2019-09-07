import { OrderClosed } from './orderClosed';
import { OrderRepository } from './repository';

import { DomainEventPublisher } from './infrastructure/domainEventPublisher';
import { DomainEventSubscriber } from './infrastructure/domainEventSubscriber';
export class CloseOrder {
  orderRepo: OrderRepository;
  constructor(orderRepo: OrderRepository) {
    this.orderRepo = orderRepo;
  }

  execute(orderId: string) {
    const orderClosedSubscriber = new OrderClosedSubscriber();
    DomainEventPublisher.getInstance().subscribe(orderClosedSubscriber);

    const order = this.orderRepo.getById(orderId);
    order.close();
  }

  onClosed(event: OrderClosed) {
    const orderId = event.id;
    console.log(`Order ${orderId} closed.`);
    // do other things...
  }
}

class OrderClosedSubscriber implements DomainEventSubscriber<OrderClosed> {
  eventClassName: string;
  constructor() {
    this.eventClassName = OrderClosed.name;
  }
  handleEvent(event: OrderClosed): void {
    console.log('Order Closed', event.id, event.occuredOn);
  }
}
