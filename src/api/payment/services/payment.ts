/**
 * payment service
 */

import { factories } from '@strapi/strapi';
import { PaymentDTO } from '../../../dtos/paymentDTO';
import { APICOLLECTION } from '../../../utils/constant';
import { Payment, PaymentInput } from '../../../types/payment';
import { toPaymentDVO } from '../../../dvos/paymentDVO';

export default factories.createCoreService('api::payment.payment', ({strapi}) =>({
    
    async createPaymentService(dto: PaymentDTO | PaymentInput ){
       
        const orderId = dto.order as string;
        const order = await strapi.documents(APICOLLECTION.ORDER).findOne({
            documentId: orderId
        })       
        if(! order){
            throw new Error ("order not found")
        }
        const amount = Number(order.payment ?? 0);
        const payment = await strapi.documents(APICOLLECTION.PAYMENT).create({
            data: {
                paymentMethod: dto.paymentMethod,
                paymentStatus: dto.paymentStatus,
                amount,
                order: order.documentId,
                paymentedAt: new Date
               
            },
             populate:{
                 order: true
             },
             status: 'published',
               
        })
        return toPaymentDVO(payment as Partial<Payment>);
        }
}));
