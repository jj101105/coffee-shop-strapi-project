/**
 * order service
 */
import { factories } from '@strapi/strapi';
import { OrderDTO } from '../../../dtos/orderDTO';
import { OrderDVO } from '../../../dvos/orderDVO';
import { APICOLLECTION } from '../../../utils/constant';
import type { Order, OrderInput } from '../../../types/order';

const populate = {
  customer: true,
  cashier: true,
  order_items: true,
};

const toOrderDVO = (order: Partial<Order>): OrderDVO => new OrderDVO({
  id: order.id,
  documentId: order.documentId,
  customer: order.customer as OrderDVO['customer'],
  cashier: order.cashier as OrderDVO['cashier'],
  total: order.total,
  tax: order.tax,
  payment: order.payment,
  orderAt: order.orderAt,
  order_items: order.order_items as OrderDVO['order_items'],
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
  publishedAt: order.publishedAt,
});

const getOrderItems = async (orderItems: Array<string | number>) => {
  const documentIds = orderItems.map(String);
  if (orderItems.length === 0) {
    throw new Error('At least one order item is required');
  }

  const items = await strapi.documents(APICOLLECTION.ORDER_ITEM).findMany({
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

const calculateAmounts = (items: Array<{ subTotal?: number | string | null }>, taxRate: number) => {
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

export default factories.createCoreService(APICOLLECTION.ORDER, () => ({
  async createOrderService(dto: OrderDTO | OrderInput) {
    const orderItems = dto.order_items ?? [];
    if (dto.customer === undefined || dto.cashier === undefined) {
      throw new Error('customer and cashier are required');
    }

    const items = await getOrderItems(orderItems);
    const amounts = calculateAmounts(items, Number(dto.tax ?? 0));
    const order = await strapi.documents(APICOLLECTION.ORDER).create({
      data: {
        customer: dto.customer,
        cashier: dto.cashier,
        order_items: {
                connect: orderItems.map(String),
        },
        orderAt: dto.orderAt ?? new Date(),
        ...amounts,
      },
      populate,
      status: 'published',
    });

    return toOrderDVO(order as Partial<Order>);
  },

  async getAllOrderService() {
    const orders = await strapi.documents(APICOLLECTION.ORDER).findMany({ populate });
    return orders.map((order) => toOrderDVO(order as Partial<Order>));
  },

  async getOrderDetailService(documentId: string) {
    const order = await strapi.documents(APICOLLECTION.ORDER).findOne({
      documentId,
      populate,
    });
    return order ? toOrderDVO(order as Partial<Order>) : null;
  },

  async updateOrderService(documentId: string, dto: OrderDTO) {
    const currentOrder = await strapi.documents(APICOLLECTION.ORDER).findOne({
      documentId,
      populate,
    });
    if (!currentOrder) {
      throw new Error(`Order with documentId ${documentId} was not found`);
    }

    const data: Record<string, unknown> = {};
    if (dto.customer !== undefined) data.customer = dto.customer;
    if (dto.cashier !== undefined) data.cashier = dto.cashier;
    if (dto.orderAt !== undefined) data.orderAt = dto.orderAt;
    if (dto.order_items !== undefined) {
      const items = await getOrderItems(dto.order_items);
            data.order_items = { set: dto.order_items.map(String) };
      Object.assign(data, calculateAmounts(items, Number(dto.tax ?? 0)));
    } else if (dto.tax !== undefined) {
      const currentItems = (currentOrder as Partial<Order>).order_items ?? [];
      const itemIds = currentItems
        .map((item) => typeof item === 'object' ? item.documentId : item)
        .filter((item): item is string | number => item !== undefined);
      const items = await getOrderItems(itemIds);
      Object.assign(data, calculateAmounts(items, Number(dto.tax)));
    }

    const order = await strapi.documents(APICOLLECTION.ORDER).update({
      documentId,
      data,
      populate,
    });

    return toOrderDVO(order as Partial<Order>);
  },

  async deleteOrderService(documentId: string) {
    const order = await strapi.documents(APICOLLECTION.ORDER).delete({ documentId });
    return order ? toOrderDVO(order as Partial<Order>) : null;
  },
}));
