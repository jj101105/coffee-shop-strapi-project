/**
 * order controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({strapi}) => ({
    async createOrder(ctx: any){
        try{
            const data = ctx.request.body;
            if(!data){
                throw new Error("Need data body");
            }
            const order = await strapi.service('api::order.order').createOrderService({
                
                    customer: data.customer,
                    cashier: data.cashier,
                    orderItems: data.orderItems,
                    tax: data.tax
            });
            return ctx.send({
                message: "Create order successfully",
                order
            })
        }catch(error){
            console.log("Error while fetching order", error);
            throw error;
        }
    }
}));
