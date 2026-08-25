/**
 * order-item service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::order-item.order-item', ({strapi}) => ({
    async createService(data: any){
        const price= Number(data.price);
        const qty = Number(data.qty);
        const disNumber = Number(data.discountNumber ?? 0)
        if(price< 0){
            throw new Error ("Price cannot be negative");
        }
        if(qty<= 0){
            throw new Error("Quantity need to be greater than 0");
        }
        if(disNumber <0){
            throw new Error ("Discount cannot be negative");
        }
        const totalAmount = qty * price ;
        const disAmount = (totalAmount * disNumber)/100;
        const subTotal = totalAmount- disAmount;
        const orderItem = await strapi.documents('api::order-item.order-item').create({
            data: {
                    name: data.name,
                    category: data.category,
                    qty,
                    price,
                    discount: data.discount,
                    discountNumber: data.discountNumber,
                    iceChoice: data.iceChoice,
                    sugarLevel: data.sugarLevel,
                    subTotal,
                    

            },
            status: "published"
        });
        return orderItem


    }
}));
