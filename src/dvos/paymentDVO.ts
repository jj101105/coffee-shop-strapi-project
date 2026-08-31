import { Payment, PaymentView } from "../types/payment";

export class PaymentDVO{
    id?: string | number | Record<string, unknown>;
    documentId?: string | undefined;
    paymentMethod?: string | undefined;
    paymentStatus?: string;
    order?: string | number | Record<string, unknown>;
    amount?: number;
    paymentedAt?: string | Date | null;
    constructor(data: Partial<PaymentDVO> = {}){
        Object.assign(this, data);
    }
}

export function toPaymentDVO(payment: Partial<Payment>): PaymentView{
    return {
        id: payment.id as PaymentView['id'],
        documentId: payment.documentId,
        paymentMethod: payment.paymentMethod,
        paymentStatus: payment.paymentStatus,
        order: payment.order,
        amount: payment.amount,
        paymentedAt: payment.paymentedAt
    };
}
 
export function toPaymentListDVO(payment: Payment[]): PaymentView[]{
    return payment.map((payment) => toPaymentDVO(payment));
}