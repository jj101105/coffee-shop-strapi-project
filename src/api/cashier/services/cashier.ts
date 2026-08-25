/**
 * cashier service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::cashier.cashier', () => ({
    async createCashierService(data: any){
        const createCashier = await strapi.documents('api::cashier.cashier').create({
            data: {
                name: data.name,
                phone: data.phone,
                password: data.password,
                workingShift: data.workingShift,
                gender: data.gender,
                email: data.email

            },
            status: "published"
        })
        return createCashier
    },
    async getAllCashierService(ctx: any){
        const getAllCashier = await strapi.query('api::cashier.cashier').findMany();
        return getAllCashier;
    },
    async getCashierDetailService(documentId: any){
        const getCashierDetail = await strapi.query('api::cashier.cashier').findOne({
            where: {
                documentId : documentId
            }
        });
        return getCashierDetail;
    }
}));
