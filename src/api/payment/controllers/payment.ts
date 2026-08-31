/**
 * payment controller
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';
import { getPaymentDTO } from '../../../utils/paymentHelper';

export default factories.createCoreController('api::payment.payment', ({strapi}) =>({

    async createPayment(ctx:any){
        try{
            const dto= getPaymentDTO(ctx);
            const payment = await strapi.service(APICOLLECTION.PAYMENT).createPaymentService(dto);
           
            return createResponse ({
                ctx,
                httpCode: HTTPCODE.CREATED,
                devCode: HTTPCODE.CREATED,
                mesage: "Create payment successfully",
                data: payment
            })
        }catch(error){
            console.log("Error while fetching payment:",error);
            throw error
        }
    }
}));
