import { Order } from "../types/order";

export class PaymentDTO {
    paymentMethod?: 'CASH' | 'CARD' | 'QRCODE' | undefined;
    paymentStatus?: 'APPROVED' | 'PENDING' | 'FAILED'| undefined;
    order?: string | number;
    amount?: number;
    paymentedAt?: string;

  constructor(data: Partial<PaymentDTO> = {}) {
    Object.assign(this, data);
  }
}