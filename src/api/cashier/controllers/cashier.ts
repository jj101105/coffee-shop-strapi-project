/**
 * cashier controller
 */

import { factories } from '@strapi/strapi';
import jwt from 'jsonwebtoken';
import { CashierDTO } from '../../../dtos/cashierDTO';
import { APICOLLECTION } from '../../../utils/constant';
import { CashierDVO } from '../../../dvos/cashierDVO';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';

const INVALID_CREDENTIALS = 'Invalid phone/email or password';

export default factories.createCoreController('api::cashier.cashier', () => ({
	async login(ctx: any) {
		const { identifier, password } = ctx.request.body ?? {};

		if (typeof identifier !== 'string' || typeof password !== 'string') {
			return ctx.badRequest('identifier and password are required');
		}

		const normalizedIdentifier = identifier.trim();
		const cashier = await strapi.db.query('api::cashier.cashier').findOne({
			where: {
				$or: [
					{ phone: normalizedIdentifier },
					{ email: normalizedIdentifier.toLowerCase() },
				],
			},
		});

		if (!cashier?.password) {
			return ctx.unauthorized(INVALID_CREDENTIALS);
		}

		const validPassword = await strapi
			.plugin('users-permissions')
			.service('user')
			.validatePassword(password, cashier.password);

		if (!validPassword) {
			return ctx.unauthorized(INVALID_CREDENTIALS);
		}

		const secret = process.env.JWT_SECRET;
		if (!secret) {
			throw new Error('JWT_SECRET is not configured');
		}

		const token = jwt.sign({ id: cashier.id, role: 'cashier' }, secret, {
			expiresIn: '7d',
		});

		return ctx.send({
			jwt: token,
			cashier: {
				id: cashier.id,
				documentId: cashier.documentId,
				name: cashier.name,
				phone: cashier.phone,
				email: cashier.email,
				workingShift: cashier.workingShift,
				gender: cashier.gender,
			},
		});
	},
    async getAllCashier(ctx: any){
        try{
            const getAllCashier = await strapi.service('api::cashier.cashier').getAllCashierService();
            return getAllCashier;
        }catch(error){
            console.log("Error while fetching cashier", error);
            throw error;
        }
    },

    async createCashier(ctx: any){
        try{
            console.log(111111111)
            const data=ctx.request.body;
            const createCashier= await strapi.service('api::cashier.cashier').createCashierService({
                name: data.name,
                phone: data.phone,
                password: data.password,
                workingShift: data.workingShift,
                gender: data.gender,
                email: data.email
            });
            console.log(2222222)
            return createCashier

        }catch(error){
            console.log("Error while fetching cashier", error)
            throw error
        }
    },
    async getCashierDetail(ctx: any){
        try {
            const documentId =ctx.params.documentId;
            const getCashierDetail = await strapi.service('api::cashier.cashier').getCashierDetailService(documentId);
            return getCashierDetail;
        }catch(error){
            console.log("Error while fetching cashier", error);
            throw error;
        }
    },
	async updateCashier(ctx: any){
		try {
			const documentId= ctx.params.documentId;
			const  dto: CashierDTO = ctx.request.body;
			const result= await strapi.service(APICOLLECTION.CASHIER).updateCashierService(documentId, dto);
			ctx.body= result;
			const dvo: CashierDVO ={
				documentId : result.documentId,
				name: result.name,
				phone: result.phone,
				workingShift: result.workingShift,
				gender: result.gender,
				email:result.email,
				order: result.order,
			}
			ctx.body={
				data:dvo
			}
			return createResponse({
				ctx,
				httpCode: HTTPCODE.CREATED,
				devCode: HTTPCODE.CREATED,
				message: "Update casher successfully",
				data:result
			})
			
		}catch(error){
			throw Error("Error while festching cashier");
		}
	},
	async deleteCashier(ctx: any){
		try{
			const documentId= ctx.params.documentId;
			const deleteCashier= await strapi.service(APICOLLECTION.CASHIER).deleteService(documentId);
			return createResponse({
				ctx,
				httpCode: HTTPCODE.SUCCESS,
				devCode: HTTPCODE.SUCCESS,
				message: "Delete cashier success",
				data: deleteCashier
			})
		}catch(error){
			throw Error ("Error while fetching cashier")
		}
	}
    
}));
