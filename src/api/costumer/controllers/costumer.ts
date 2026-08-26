/**
 * costumer controller
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';

export default factories.createCoreController('api::costumer.costumer',({strapi}) => ({
    async createCostumer(ctx:any){
        try{
            const data= ctx.request.body;
            const createCostumer = await strapi.service(APICOLLECTION.CUSTOMER).createService({
                name: data.name,
                gender: data.gender,
                phone: data.phone
            })
            return ctx.send ({
                message: "Create costumer successfully",
                createCostumer
            })           

        }catch(error){
            console.log("Error while fetching costumer", error);
            throw error;
        }
    },
    //status 500
    async getAllCostumer(ctx: any){
        try{
            const costumer= await strapi.service(APICOLLECTION.CUSTOMER).getAllService();
            return createResponse ({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: "Get all costumer successfully",
                costumer
            })

        }catch(error){
            console.log("Error while fetching costumer", error);
            throw error;
        }
    }
}));
