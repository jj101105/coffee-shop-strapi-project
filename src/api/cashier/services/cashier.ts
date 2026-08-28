/**
 * cashier service
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { CashierDTO } from '../../../dtos/cashierDTO';
import { CashierDVO, toCashierDVO } from '../../../dvos/cashierDVO';
import type { Cashier } from '../../../types/cashier';


export default factories.createCoreService('api::cashier.cashier', () => ({
    
    async createCashierService(data: CashierDTO){
        const requiredFields = [data.name, data.phone, data.password, data.workingShift, data.gender, data.email];
        if (requiredFields.some((value) => value === undefined || value === null || value === '')) {
            throw new Error('name, phone, password, workingShift, gender, and email are required');
        }

        const createCashier = await strapi.documents('api::cashier.cashier').create({
            data,
            status: "published"
        })
        return toCashierDVO(createCashier as Partial<Cashier>);
    },
    async getAllCashierService(){
        const cashiers = await strapi.query(APICOLLECTION.CASHIER).findMany();
        return cashiers.map((cashier: Cashier) => toCashierDVO(cashier));
    },
    async getCashierDetailService(documentId: string){
        const cashier = await strapi.query(APICOLLECTION.CASHIER).findOne({
            where: {
                documentId,
            }
        });
        return cashier ? toCashierDVO(cashier) : null;
    },
    async updateCashierService(documentId: string, dto: CashierDTO){
        const data = Object.fromEntries(
            Object.entries(dto).filter(([, value]) => value !== undefined),
        );
        const cashier = await strapi.documents(APICOLLECTION.CASHIER).update({
            documentId,
            data,
        })
        if (!cashier) {
            throw new Error(`Cashier with documentId ${documentId} was not found`);
        }

        return toCashierDVO(cashier as Partial<Cashier>);
    },
    async deleteCashierService(documentId: string){
        const cashier = await strapi.documents(APICOLLECTION.CASHIER).delete({ documentId });
        return cashier ? toCashierDVO(cashier as Partial<Cashier>) : null;
    }
}));
