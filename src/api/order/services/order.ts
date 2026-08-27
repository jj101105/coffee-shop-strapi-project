/**
 * order service
 */
import { factories } from '@strapi/strapi';
import { OrderDTO } from '../../../dtos/orderDTO';
import { OrderDVO, toOrderDVO } from '../../../dvos/orderDVO';
import { APICOLLECTION } from '../../../utils/constant';
import { ORDER_POPULATE, calculateAmounts, getOrderItems } from '../../../utils/orderHelper';
import type { Order, OrderInput } from '../../../types/order';



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
      populate: ORDER_POPULATE,
      status: 'published',
    });

    return toOrderDVO(order as Partial<Order>);
  },

  async getAllOrderService() {
    const orders = await strapi.documents(APICOLLECTION.ORDER).findMany({ populate: ORDER_POPULATE });
    return orders.map((order) => toOrderDVO(order as Partial<Order>));
  },

  async getOrderDetailService(documentId: string) {
    const order = await strapi.documents(APICOLLECTION.ORDER).findOne({
      documentId,
      populate: ORDER_POPULATE,
    });
    return order ? toOrderDVO(order as Partial<Order>) : null;
  },

  async updateOrderService(documentId: string, dto: OrderDTO) {
    const currentOrder = await strapi.documents(APICOLLECTION.ORDER).findOne({
      documentId,
      populate: ORDER_POPULATE,
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
      populate: ORDER_POPULATE,
    });

    return toOrderDVO(order as Partial<Order>);
  },

  async deleteOrderService(documentId: string) {
    const order = await strapi.documents(APICOLLECTION.ORDER).delete({ documentId });
    return order ? toOrderDVO(order as Partial<Order>) : null;
  },
}));
