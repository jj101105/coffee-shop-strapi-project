/**
 * cashier controller
 */

import { factories } from '@strapi/strapi';
import jwt from 'jsonwebtoken';
import { CashierDTO } from '../../../dtos/cashierDTO';
import { APICOLLECTION } from '../../../utils/constant';
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
		const cashiers = await strapi.service(APICOLLECTION.CASHIER).getAllCashierService();
		return createResponse({
			ctx,
			httpCode: HTTPCODE.SUCCESS,
			devCode: HTTPCODE.SUCCESS,
			message: 'Get all cashiers successfully',
			data: cashiers,
		});
	},

	async createCashier(ctx: any){
		const dto = new CashierDTO(ctx.request.body?.data ?? ctx.request.body ?? {});
		const cashier = await strapi.service(APICOLLECTION.CASHIER).createCashierService(dto);
		return createResponse({
			ctx,
			httpCode: HTTPCODE.CREATED,
			devCode: HTTPCODE.CREATED,
			message: 'Create cashier successfully',
			data: cashier,
		});
	},

	async getCashierDetail(ctx: any){
		const cashier = await strapi.service(APICOLLECTION.CASHIER).getCashierDetailService(ctx.params.documentId);
		if (!cashier) {
			return ctx.notFound('Cashier not found');
		}

		return createResponse({
			ctx,
			httpCode: HTTPCODE.SUCCESS,
			devCode: HTTPCODE.SUCCESS,
			message: 'Get cashier successfully',
			data: cashier,
		});
	},
	async updateCashier(ctx: any){
		const dto = new CashierDTO(ctx.request.body?.data ?? ctx.request.body ?? {});
		const cashier = await strapi.service(APICOLLECTION.CASHIER).updateCashierService(ctx.params.documentId, dto);
		return createResponse({
			ctx,
			httpCode: HTTPCODE.SUCCESS,
			devCode: HTTPCODE.SUCCESS,
			message: 'Update cashier successfully',
			data: cashier,
		});
	},
	async deleteCashier(ctx: any){
		const cashier = await strapi.service(APICOLLECTION.CASHIER).deleteCashierService(ctx.params.documentId);
		return createResponse({
			ctx,
			httpCode: HTTPCODE.SUCCESS,
			devCode: HTTPCODE.SUCCESS,
			message: 'Delete cashier successfully',
			data: cashier,
		});
	}
    
}));
