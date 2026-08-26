/**
 * cashier service
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { CashierDTO } from '../../../dtos/cashierDTO';
import { CashierDVO } from '../../../dvos/cashierDVO';

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
    },
    async updateCashierService(documentId: string, dto:CashierDTO ){
        const updateCashier = await strapi.documents(APICOLLECTION.CASHIER).update({
            
                documentId,
                data: {
                    name: dto?.name,
                    phone: dto?.phone,
                    workingShift: dto?.workingShift,
                    gender: dto?.gender,
                    email: dto?.email,
                    order: dto?.order
                }
            
        })
        if (!updateCashier) {
            throw new Error(`Cashier with documentId ${documentId} was not found`);
        }

        const dvo: CashierDVO = {
            documentId: updateCashier.documentId,
            name: updateCashier.name ?? undefined,
            phone: updateCashier.phone ?? undefined,
            workingShift: updateCashier.workingShift ?? undefined,
            gender: updateCashier.gender ?? undefined,
            email: updateCashier.email ?? undefined,
        }
        return dvo;
    },
    async deleteService(documentId: any){
        const deleteCashier= await strapi.documents(APICOLLECTION.CASHIER).delete(documentId);
        return deleteCashier
    }
}));
