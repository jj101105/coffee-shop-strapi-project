/**
 * order-item controller
 */

import { factories } from '@strapi/strapi';
import category from '../../category/controllers/category';

export default factories.createCoreController('api::order-item.order-item', ({strapi}) =>({
    async createOrderItem(ctx: any){
        try{

        const data=ctx.request.body;
        if(!data){
            ctx.badRequest("Bad request");
        }

        const createOrderItem = await strapi.service('api::order-item.order-item').createService({
            name: data.name,
            qty: data.qty,
            price: data.price,
            discount: data.discount,
            discountNumber: data.discountNumber,
            icechoice: data.iceChoice, //ice cannot push value yet
            sugarLevel: data.sugarLevel,
            subtotal: data.subtotal,
            category: data.category //category cannot push data in field yet
           
        });
        return ctx.send({
            message: "Create order item successfully",
            data: createOrderItem
        })

        }catch(error){
            console.log('Error while fetching order item');
            throw error;
            
        }
    }
}));
