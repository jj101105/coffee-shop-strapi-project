import { Order, OrderView } from '../types/order';

export class OrderDVO {
  id?: string | number;
  documentId?: string;
  customer?: string | number | Record<string, unknown>;
  cashier?: string | number | Record<string, unknown>;
  total?: number;
  tax?: number;
  payment?: number;
  orderAt?: string | Date;
  order_items?: Array<string | number | Record<string, unknown>>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  publishedAt?: string | Date | null;

  constructor(data: Partial<OrderDVO> = {}) {
    Object.assign(this, data);
  }
}

export function toOrderDVO(order: Partial<Order>): OrderView {
  return {
    id: order.id as OrderView['id'],
    documentId: order.documentId,
    customer: order.customer as OrderView['customer'],
    cashier: order.cashier as OrderView['cashier'],
    total: order.total,
    tax: order.tax,
    payment: order.payment,
    orderAt: order.orderAt,
    order_items: order.order_items as OrderView['order_items'],
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    publishedAt: order.publishedAt,
  };
}

export function toOrderListDVO(orders: Order[]): OrderView[] {
  return orders.map((order) => toOrderDVO(order));
}