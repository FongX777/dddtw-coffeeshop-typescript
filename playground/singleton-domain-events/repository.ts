import { Order } from './order.model';
export class OrderRepository {
  constructor() {}

  getById(id: string): Order {
    return new Order({ id, status: 0 });
  }
}
