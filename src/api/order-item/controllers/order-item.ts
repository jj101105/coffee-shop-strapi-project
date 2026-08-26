/**
 * order-item controller
 */

import { factories } from '@strapi/strapi';
import { OrderItemDTO } from '../../../dtos/orderItemDTO';
import { APICOLLECTION } from '../../../utils/constant';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';

const getOrderItemDTO = (ctx: any) => {
    const body = ctx.request.body?.data ?? ctx.request.body ?? {};
    return new OrderItemDTO({
        name: body.name,
        qty: body.qty,
        price: body.price,
        discount: body.discount,
        discountNumber: body.discountNumber,
        iceChoice: body.iceChoice,
        sugarLevel: body.sugarLevel,
        categories: body.categories ?? body.category,
    });
};

export default factories.createCoreController(APICOLLECTION.ORDER_ITEM, () => ({
    async createOrderItem(ctx: any) {
        const item = await strapi.service(APICOLLECTION.ORDER_ITEM).createOrderItemService(getOrderItemDTO(ctx));
        return createResponse({ ctx, httpCode: HTTPCODE.CREATED, devCode: HTTPCODE.CREATED, message: 'Create order item successfully', data: item });
    },

    async getAllOrderItem(ctx: any) {
        const items = await strapi.service(APICOLLECTION.ORDER_ITEM).getAllOrderItemService();
        return createResponse({ ctx, httpCode: HTTPCODE.SUCCESS, devCode: HTTPCODE.SUCCESS, message: 'Get all order items successfully', data: items });
    },

    async getOrderItemDetail(ctx: any) {
        const item = await strapi.service(APICOLLECTION.ORDER_ITEM).getOrderItemDetailService(ctx.params.documentId);
        if (!item) return ctx.notFound('Order item not found');
        return createResponse({ ctx, httpCode: HTTPCODE.SUCCESS, devCode: HTTPCODE.SUCCESS, message: 'Get order item successfully', data: item });
    },

    async updateOrderItem(ctx: any) {
        const item = await strapi.service(APICOLLECTION.ORDER_ITEM).updateOrderItemService(ctx.params.documentId, getOrderItemDTO(ctx));
        return createResponse({ ctx, httpCode: HTTPCODE.SUCCESS, devCode: HTTPCODE.SUCCESS, message: 'Update order item successfully', data: item });
    },

    async deleteOrderItem(ctx: any) {
        const item = await strapi.service(APICOLLECTION.ORDER_ITEM).deleteOrderItemService(ctx.params.documentId);
        return createResponse({ ctx, httpCode: HTTPCODE.SUCCESS, devCode: HTTPCODE.SUCCESS, message: 'Delete order item successfully', data: item });
    },
}));
