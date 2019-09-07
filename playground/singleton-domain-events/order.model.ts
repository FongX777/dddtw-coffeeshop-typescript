import { OrderClosed } from './orderClosed';
import { DomainEventPublisher } from './infrastructure/domainEventPublisher';
interface OrderProps {
  id: string;
  status: number;
}

type OrderClosedHandler = (event: OrderClosed) => void;

export class Order {
  readonly id: string;
  status: number;
  constructor(props: OrderProps) {
    this.id = props.id;
    this.status = props.status;
  }

  static create(id: string): Order {
    return new Order({ id, status: 0 });
  }

  close(): void {
    if (this.status === 1) {
      // nothing happends
    } else {
      this.status = 1;
      DomainEventPublisher.getInstance().publish(new OrderClosed(this.id));
    }
  }
}
