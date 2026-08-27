/**
 * customer controller
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { getCustomerDTO } from '../../../utils/costumerHelper';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';



const handleError = (ctx: any, error: unknown) => {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    const isNotFound = /not found/i.test(message);
    const isValidationError = /required|invalid|must be|were not found/i.test(message);
    const httpCode = isNotFound ? HTTPCODE.NOT_FOUND : isValidationError ? HTTPCODE.BAD_REQUEST : HTTPCODE.INTERNAL_SERVER_ERROR;

    return createResponse({
        ctx,
        httpCode,
        devCode: httpCode,
        message,
        data: null,
    });
};

export default factories.createCoreController(APICOLLECTION.CUSTOMER, () => ({
    async createCostumer(ctx: any) {
        try {
            const customer = await strapi.service(APICOLLECTION.CUSTOMER).createCustomerService(getCustomerDTO(ctx));
            return createResponse({
                ctx,
                httpCode: HTTPCODE.CREATED,
                devCode: HTTPCODE.CREATED,
                message: 'Create customer successfully',
                data: customer,
            });
        } catch (error) {
            return handleError(ctx, error);
        }
    },

    async getAllCostumer(ctx: any) {
        try {
            const customers = await strapi.service(APICOLLECTION.CUSTOMER).getAllCustomerService();
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: 'Get all customers successfully',
                data: customers,
            });
        } catch (error) {
            return handleError(ctx, error);
        }
    },

    async getCostumerDetail(ctx: any) {
        try {
            const customer = await strapi.service(APICOLLECTION.CUSTOMER).getCustomerDetailService(ctx.params.documentId);
            if (!customer) return ctx.notFound('Customer not found');
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: 'Get customer successfully',
                data: customer,
            });
        } catch (error) {
            return handleError(ctx, error);
        }
    },

    async updateCostumer(ctx: any) {
        try {
            const customer = await strapi.service(APICOLLECTION.CUSTOMER).updateCustomerService(ctx.params.documentId, getCustomerDTO(ctx));
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: 'Update customer successfully',
                data: customer,
            });
        } catch (error) {
            return handleError(ctx, error);
        }
    },

    async deleteCostumer(ctx: any) {
        try {
            const customer = await strapi.service(APICOLLECTION.CUSTOMER).deleteCustomerService(ctx.params.documentId);
            if (!customer) return ctx.notFound('Customer not found');
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: 'Delete customer successfully',
                data: customer,
            });
        } catch (error) {
            return handleError(ctx, error);
        }
    },
}));
