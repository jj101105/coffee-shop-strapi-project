import { OrderDTO } from '../dtos/orderDTO';
import type { Order, OrderInput } from '../types/order';

export const ORDER_POPULATE = {
  customer: true,
  cashier: true,
  order_items: true,
};

export const getOrderDTO = (ctx: any) => {
  const body = ctx.request.body?.data ?? ctx.request.body ?? {};
  return new OrderDTO({
    customer: body.customer ?? body.costumer,
    cashier: body.cashier,
    tax: body.tax,
    orderAt: body.orderAt,
    order_items: body.order_items ?? body.orderItems,
  });
};

export const normalizeOrder = (order: Partial<Order>) => ({
  ...order,
  order_items: order.order_items,
  customer: order.customer,
  cashier: order.cashier,
});

export const getOrderItems = async (orderItems: Array<string | number>) => {
  const documentIds = orderItems.map(String);
  if (orderItems.length === 0) {
    throw new Error('At least one order item is required');
  }

  const items = await strapi.documents('api::order-item.order-item').findMany({
    filters: {
      documentId: {
        $in: documentIds,
      },
    },
  });

  if (items.length !== orderItems.length) {
    throw new Error('One or more order items were not found');
  }

  return items;
};

export const calculateAmounts = (items: Array<{ subTotal?: number | string | null }>, taxRate: number) => {
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100 percent');
  }

  const total = items.reduce((sum, item) => sum + Number(item.subTotal ?? 0), 0);
  const tax = total * (taxRate / 100);

  return {
    total,
    tax,
    payment: total + tax,
  };
};

export const orderData = (dto: OrderDTO | OrderInput) => ({
  ...(dto.customer !== undefined ? { customer: dto.customer } : {}),
  ...(dto.cashier !== undefined ? { cashier: dto.cashier } : {}),
  ...(dto.orderAt !== undefined ? { orderAt: dto.orderAt } : {}),
  ...(dto.tax !== undefined ? { tax: dto.tax } : {}),
  ...(dto.order_items !== undefined ? { order_items: { set: dto.order_items.map(String) } } : {}),
});
