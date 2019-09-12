import { EntityId } from '../../EntityId';
import { AggregateRoot } from '../../AggregateRoot';
import { DomainEventPublisher } from '../../event/DomainEventPublisher';
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
  static getClosedOrder(orderId: string): Order {
    return new Order(new OrderId(orderId), {
      status: OrderStatus.CLOSED,
    });
  }
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
      this.addDomainEvent(new OrderClosedEvent(this.id));
      // DomainEventPublisher.getInstance().publish(new OrderClosedEvent(this.id));
    }
  }
}

describe('Domain Events Publisher', () => {
  beforeEach(() => {
    DomainEventPublisher.getInstance().clearHandlers();
  });

  describe('Given a domain model', () => {
    it('should publish a domain event and the event should be handled', () => {
      const orderIdStr = '123456789';
      const order = Order.placeOrder(orderIdStr);

      const mockHandler = jest.fn((event: OrderClosedEvent) => {
        const { orderId } = event;
        expect(orderId.equals(order.id)).toBeTruthy();
      });

      DomainEventPublisher.getInstance().register(
        OrderClosedEvent.name,
        mockHandler
      );

      order.closeOrder();
      DomainEventPublisher.getInstance().publishForAggregate(order);
      expect(order.status).toBe(OrderStatus.CLOSED);
      expect(mockHandler).toHaveBeenCalledTimes(1);
      const calledEventOrderId = mockHandler.mock.calls[0][0].orderId;
      expect(calledEventOrderId.value).toBe(orderIdStr);
    });

    it('should not publish any domain since command failed', () => {
      const order = Order.getClosedOrder('123456789');

      const mockHandler = jest.fn((event: OrderClosedEvent) => {});
      DomainEventPublisher.getInstance().register(
        OrderClosedEvent.name,
        mockHandler
      );

      order.closeOrder();
      DomainEventPublisher.getInstance().publishForAggregate(order);
      expect(order.status).toBe(OrderStatus.CLOSED);
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });
});
