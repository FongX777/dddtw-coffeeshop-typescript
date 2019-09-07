import { OrderClosed } from './orderClosed';
import { OrderRepository } from './repository';
export class CloseOrder {
  orderRepo: OrderRepository;
  constructor(orderRepo: OrderRepository) {
    this.orderRepo = orderRepo;
  }

  execute(orderId: string) {
    const order = this.orderRepo.getById(orderId);
    order.setOrderClosedHandler(this.onClosed.bind(this));
    order.close();
  }

  onClosed(event: OrderClosed) {
    const orderId = event.id;
    console.log(`Order ${orderId} closed.`);
    // do other things...
  }
}
