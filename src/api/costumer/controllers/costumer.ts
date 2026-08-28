/**
 * customer controller
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { getCustomerDTO } from '../../../utils/costumerHelper';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';

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
           throw Error("Error while create costumer" +error)
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
            throw Error("Error while get costumer" +error)
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
             throw Error("Error while get costumer detail" +error)
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
             throw Error("Error while update costumer" +error)
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
             throw Error("Error while delete costumer" +error)
        }
    },
}));
