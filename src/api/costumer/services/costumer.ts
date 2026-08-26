/**
 * costumer service
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';

export default factories.createCoreService('api::costumer.costumer', ({strapi}) => ({
    async createService (ctx: any){
        const createCostumer = await strapi.documents(APICOLLECTION.CUSTOMER).findMany();
        return ctx.send ({
            message: "Create costumer successfully",
            createCostumer
        })
    },

    //this api status 500
    async getAllService(ctx: any){
        try{
            const result = await strapi.query(APICOLLECTION.CUSTOMER).findMany();
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: "Get all costumer successfully",
                result
            })

        }catch(error){
            throw Error("Error while fetching costumer");
        }
    }
}));
