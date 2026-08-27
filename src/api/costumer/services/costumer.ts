/**
 * customer service
 */

import { factories } from '@strapi/strapi';
import { CostumerDTO } from '../../../dtos/costumerDTO';
import { CostumerDVO } from '../../../dvos/costumerDVO';
import { APICOLLECTION } from '../../../utils/constant';
import { CUSTOMER_POPULATE, customerData } from '../../../utils/costumerHelper';
import type { Costumer, CreateCostumerInput } from '../../../types/costumer';

const toCostumerDVO = (customer: Partial<Costumer>): CostumerDVO => new CostumerDVO({
    id: customer.id,
    documentId: customer.documentId,
    name: customer.name,
    gender: customer.gender,
    phone: customer.phone,
    orders: customer.orders as CostumerDVO['orders'],
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
    publishedAt: customer.publishedAt,
});

export default factories.createCoreService(APICOLLECTION.CUSTOMER, () => ({
    async createCustomerService(dto: CostumerDTO | CreateCostumerInput) {
        const customer = await strapi.documents(APICOLLECTION.CUSTOMER).create({
            data: customerData(dto),
            populate: CUSTOMER_POPULATE,
            status: 'published',
        });
        return toCostumerDVO(customer as Partial<Costumer>);
    },

    async getAllCustomerService() {
        const customers = await strapi.documents(APICOLLECTION.CUSTOMER).findMany({ populate: CUSTOMER_POPULATE });
        return customers.map((customer) => toCostumerDVO(customer as Partial<Costumer>));
    },

    async getCustomerDetailService(documentId: string) {
        const customer = await strapi.documents(APICOLLECTION.CUSTOMER).findOne({ documentId, populate: CUSTOMER_POPULATE });
        return customer ? toCostumerDVO(customer as Partial<Costumer>) : null;
    },

    async updateCustomerService(documentId: string, dto: CostumerDTO) {
        const currentCustomer = await strapi.documents(APICOLLECTION.CUSTOMER).findOne({ documentId });
        if (!currentCustomer) throw new Error(`Customer with documentId ${documentId} was not found`);

        const current = currentCustomer as Partial<Costumer>;
        const data: Record<string, unknown> = {
            name: dto.name?.trim() ?? current.name,
            phone: dto.phone?.trim() ?? current.phone,
            ...(dto.gender !== undefined ? { gender: dto.gender } : {}),
        };
        if (!String(data.name).trim() || !String(data.phone).trim()) {
            throw new Error('name and phone are required');
        }

        const customer = await strapi.documents(APICOLLECTION.CUSTOMER).update({
            documentId,
            data,
            populate: CUSTOMER_POPULATE,
        });
        return toCostumerDVO(customer as Partial<Costumer>);
    },

    async deleteCustomerService(documentId: string) {
        const customer = await strapi.documents(APICOLLECTION.CUSTOMER).delete({ documentId });
        return customer ? toCostumerDVO(customer as Partial<Costumer>) : null;
    },
}));
