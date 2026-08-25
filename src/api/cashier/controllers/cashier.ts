/**
 * cashier controller
 */

import { factories } from '@strapi/strapi';
import jwt from 'jsonwebtoken';

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
    
}));
