/**
 * dashboard controller
 */

import { factories } from '@strapi/strapi';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';
import { APICOLLECTION } from '../../../utils/constant';

export default factories.createCoreController(APICOLLECTION.DASHBOARD, () => ({
    async getDashboard(ctx: any) {
        try {
            const dashboard = await strapi.service(APICOLLECTION.DASHBOARD).getDashboardService();

            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: 'Get dashboard successfully',
                data: dashboard,
            });
        } catch (error) {
            console.log('Error while fetching dashboard', error);
            throw error;
        }
    }
}));
