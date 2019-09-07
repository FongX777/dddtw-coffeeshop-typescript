import { OrderClosed } from './orderClosed';
interface OrderProps {
  id: string;
  status: number;
}

type OrderClosedHandler = (event: OrderClosed) => void;

export class Order {
  readonly id: string;
  status: number;
  orderClosedHandler?: OrderClosedHandler;
  constructor(props: OrderProps) {
    this.id = props.id;
    this.status = props.status;
  }

  static create(id: string): Order {
    return new Order({ id, status: 0 });
  }

  setOrderClosedHandler(handler: OrderClosedHandler) {
    this.orderClosedHandler = handler;
  }

  close(): void {
    if (this.status === 1) {
      // nothing happends
    } else {
      this.status = 1;
      this.orderClosedHandler(new OrderClosed(this.id));
    }
  }
}
