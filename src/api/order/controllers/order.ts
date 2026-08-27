/**
 * order controller
 */
import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { getOrderDTO } from '../../../utils/orderHelper';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';



export default factories.createCoreController(APICOLLECTION.ORDER, () => ({
    async createOrder(ctx: any) {
        try {
            const dto = getOrderDTO(ctx);
            const order = await strapi.service(APICOLLECTION.ORDER).createOrderService(dto);
            return createResponse({
                ctx,
                httpCode: HTTPCODE.CREATED,
                devCode: HTTPCODE.CREATED,
                message: 'Create order successfully',
                data: order
            });
        } catch (error) {
            throw Error("Error while creating order data: " + error);
        }
    },

    async getAllOrder(ctx: any) {
        try {
            const orders = await strapi.service(APICOLLECTION.ORDER).getAllOrderService();
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: 'Get all orders successfully',
                data: orders
            });
        } catch (error) {
            throw Error("Error while fetching order data: " + error);
        }
    },

    async getOrderDetail(ctx: any) {
        try {
            const order = await strapi.service(APICOLLECTION.ORDER).getOrderDetailService(ctx.params.documentId);
            if (!order) return ctx.notFound('Order not found');
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: 'Get order successfully',
                data: order
            });
        } catch (error) {
           throw Error("Error while fetching order data: " + error);
        }
    },

    async updateOrder(ctx: any) {
        try {
            const dto = getOrderDTO(ctx);
            const order = await strapi.service(APICOLLECTION.ORDER).updateOrderService(ctx.params.documentId, dto);
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: 'Update order successfully',
                data: order
            });
        } catch (error) {
           throw Error("Error while updating order data: " + error);
        }
    },

    async deleteOrder(ctx: any) {
        try {
            const order = await strapi.service(APICOLLECTION.ORDER).deleteOrderService(ctx.params.documentId);
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: 'Delete order successfully',
                data: order
            });
        } catch (error) {
            throw Error("Error while fetching order data: " + error);
        }
    },
}));
