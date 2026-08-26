/**
 * customer controller
 */

import { factories } from '@strapi/strapi';
import { CostumerDTO } from '../../../dtos/costumerDTO';
import { APICOLLECTION } from '../../../utils/constant';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';

const getCustomerDTO = (ctx: any) => {
    const body = ctx.request.body?.data ?? ctx.request.body ?? {};
    return new CostumerDTO({ name: body.name, gender: body.gender, phone: body.phone });
};

const response = (ctx: any, message: string, data: unknown, httpCode: number = HTTPCODE.SUCCESS) =>
    createResponse({ ctx, httpCode, devCode: httpCode, message, data });

export default factories.createCoreController(APICOLLECTION.CUSTOMER, () => ({
    async createCostumer(ctx: any) {
        const customer = await strapi.service(APICOLLECTION.CUSTOMER).createCustomerService(getCustomerDTO(ctx));
        return response(ctx, 'Create customer successfully', customer, HTTPCODE.CREATED);
    },

    async getAllCostumer(ctx: any) {
        const customers = await strapi.service(APICOLLECTION.CUSTOMER).getAllCustomerService();
        return response(ctx, 'Get all customers successfully', customers);
    },

    async getCostumerDetail(ctx: any) {
        const customer = await strapi.service(APICOLLECTION.CUSTOMER).getCustomerDetailService(ctx.params.documentId);
        if (!customer) return ctx.notFound('Customer not found');
        return response(ctx, 'Get customer successfully', customer);
    },

    async updateCostumer(ctx: any) {
        const customer = await strapi.service(APICOLLECTION.CUSTOMER).updateCustomerService(ctx.params.documentId, getCustomerDTO(ctx));
        return response(ctx, 'Update customer successfully', customer);
    },

    async deleteCostumer(ctx: any) {
        const customer = await strapi.service(APICOLLECTION.CUSTOMER).deleteCustomerService(ctx.params.documentId);
        if (!customer) return ctx.notFound('Customer not found');
        return response(ctx, 'Delete customer successfully', customer);
    },
}));
