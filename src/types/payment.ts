import { Order } from "./order";

export interface Payment {
    id: string | number;
    documentId: string | undefined;
    paymentMethod: string | undefined;
    paymentStatus: string | undefined;
    order?: Order | string | number;
    amount?: number | null | undefined;
    paymentedAt?:string
}
export interface PaymentInput{
    paymentMethod?: "CASH" | "CARD" | "QRCODE" | undefined;
    paymentStatus?: "APPROVED" | "PENDING" | "FAILED" | undefined;
    order?: string | number;
    amount?: number | null | undefined;
    paymentedAt?: string;
}
export interface PaymentView extends Payment {}