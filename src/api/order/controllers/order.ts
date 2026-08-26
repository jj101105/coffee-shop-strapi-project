/**
 * order controller
 */
import { factories } from '@strapi/strapi';
import { OrderDTO } from '../../../dtos/orderDTO';
import { APICOLLECTION } from '../../../utils/constant';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';

export default factories.createCoreController(APICOLLECTION.ORDER, () => ({
    async createOrder(ctx: any) {
        const body = ctx.request.body?.data ?? ctx.request.body ?? {};
        const dto = new OrderDTO({
            customer: body.customer ?? body.costumer,
            cashier: body.cashier,
            tax: body.tax,
            orderAt: body.orderAt,
            order_items: body.order_items ?? body.orderItems,
        });
        const order = await strapi.service(APICOLLECTION.ORDER).createOrderService(dto);

        return createResponse({
            ctx,
            httpCode: HTTPCODE.CREATED,
            devCode: HTTPCODE.CREATED,
            message: 'Create order successfully',
            data: order,
        });
    },

    async getAllOrder(ctx: any) {
        const orders = await strapi.service(APICOLLECTION.ORDER).getAllOrderService();
        return createResponse({
            ctx,
            httpCode: HTTPCODE.SUCCESS,
            devCode: HTTPCODE.SUCCESS,
            message: 'Get all orders successfully',
            data: orders,
        });
    },

    async getOrderDetail(ctx: any) {
        const order = await strapi.service(APICOLLECTION.ORDER).getOrderDetailService(ctx.params.documentId);
        if (!order) return ctx.notFound('Order not found');

        return createResponse({
            ctx,
            httpCode: HTTPCODE.SUCCESS,
            devCode: HTTPCODE.SUCCESS,
            message: 'Get order successfully',
            data: order,
        });
    },

    async updateOrder(ctx: any) {
        const body = ctx.request.body?.data ?? ctx.request.body ?? {};
        const dto = new OrderDTO({
            customer: body.customer ?? body.costumer,
            cashier: body.cashier,
            tax: body.tax,
            orderAt: body.orderAt,
            order_items: body.order_items ?? body.orderItems,
        });
        const order = await strapi.service(APICOLLECTION.ORDER).updateOrderService(ctx.params.documentId, dto);

        return createResponse({
            ctx,
            httpCode: HTTPCODE.SUCCESS,
            devCode: HTTPCODE.SUCCESS,
            message: 'Update order successfully',
            data: order,
        });
    },

    async deleteOrder(ctx: any) {
        const order = await strapi.service(APICOLLECTION.ORDER).deleteOrderService(ctx.params.documentId);
        return createResponse({
            ctx,
            httpCode: HTTPCODE.SUCCESS,
            devCode: HTTPCODE.SUCCESS,
            message: 'Delete order successfully',
            data: order,
        });
    },
}));
