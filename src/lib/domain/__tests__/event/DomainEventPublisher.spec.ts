import { EntityId } from '../../EntityId';
import { AggregateRoot } from '../../AggregateRoot';
import {
  DomainEventPublisher,
  DomainEventHandler,
} from '../../event/DomainEventPublisher';
import { DomainEvent } from '../../event/DomainEvent';

class OrderId extends EntityId<string> {}
enum OrderStatus {
  PROCESSING,
  CLOSED,
}
interface OrderProps {
  status: OrderStatus;
}

class OrderClosedEvent extends DomainEvent {
  orderId: OrderId;
  constructor(orderId: OrderId) {
    super();
    this.orderId = orderId;
  }
}

class Order extends AggregateRoot<OrderId, OrderProps> {
  static placeOrder(orderId: string): Order {
    return new Order(new OrderId(orderId), {
      status: OrderStatus.PROCESSING,
    });
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  closeOrder(): void {
    if (this.props.status === OrderStatus.PROCESSING) {
      this.props.status = OrderStatus.CLOSED;
      DomainEventPublisher.getInstance().publish(new OrderClosedEvent(this.id));
    }
  }
}

describe('Domain Events Publisher', () => {
  beforeEach(() => {});

  describe('Given a domain model', () => {
    it('should publish a domain event and the event should be handled', () => {
      const orderIdStr = '123456789';
      const order = Order.placeOrder(orderIdStr);

      const handler = ((event: OrderClosedEvent) => {
        const { orderId } = event;
        expect(orderId.equals(order.id)).toBeTruthy();
      }) as DomainEventHandler<DomainEvent>;

      DomainEventPublisher.getInstance().register(
        OrderClosedEvent.name,
        handler
      );

      order.closeOrder();
      expect(order.status).toBe(OrderStatus.CLOSED);
    });

    it('should not publish any domain since command failed', () => {
      const orderId = new OrderId('123456789');
      const order = new Order(orderId, { status: OrderStatus.CLOSED });

      const handler = ((event: OrderClosedEvent) => {
        fail();
      }) as DomainEventHandler<DomainEvent>;
      DomainEventPublisher.getInstance().register(
        OrderClosedEvent.name,
        handler
      );

      order.closeOrder();
      expect(order.status).toBe(OrderStatus.CLOSED);
    });
  });
});
