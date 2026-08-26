/**
 * order service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::order.order', ({strapi}) => ({
    async createOrderService(data: any){

        const orderItemId = data.orderItems ?? [];

        if (!Array.isArray(orderItemId) || orderItemId.length === 0) {
        throw new Error('At least one order item is required');
      }
      const orderItems = await strapi.documents('api::order-item.order-item').findMany({
        filters: {
            documentId: {
                $in: orderItemId
            }
        }
      })
      if(orderItems.length !== orderItemId.length){
        throw new Error("Require at least one order item");
      }
      const total = orderItems.reduce(
        (sum, item) => sum + Number(item.subTotal ?? 0),
        0
      )
      const taxRate = Number(data.tax ?? 0)

      if (taxRate < 0 || taxRate > 100){
        throw new Error ("Tax rate need to be between 0% to 100%");
      }
      const taxAmount = total * (taxRate/100);
      const payment = total + taxAmount;
      const orderAt = new Date();
      const createOrder = await strapi.documents('api::order.order').create({
        //costumer and order item did not display data in the field yet
        data: {
            customers: {
              connect: [data.costumer],
            },
            order_items: {
              connect: orderItemId,
            },
            orderAt,
            cashier: data.cashier,
            total,
            tax: taxAmount,
            payment,

        },
        populate: {
          customers: true,
          order_items: true,
          cashier: true,
        },
        status: "published"
      });
      return createOrder;
    }
}));
