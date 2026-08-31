
import { Dashboard, DashboardView } from "../types/dashboard";


export class DashboardDVO{

id?: string | number | Record< string, unknown>;
documentId?: string;
order?: string |number | Record< string, unknown>;
cashier?: string |number | Record< string, unknown>;
costumer?: string | number | Record< string, unknown>;
totalAmount?: number;

    constructor(data: Partial<DashboardDVO> = {}){
        Object.assign(this, data);
    }
}

export function toDashboardDVO(payment: Partial<Dashboard>): DashboardView{
    return {
        id: payment.id as DashboardView['id'],
        documentId: payment.documentId,
        order: payment.order as DashboardView['order'],
        cashier: payment.cashier as DashboardView['cashier'],
        costumer: payment.costumer as DashboardView['costumer'],
        totalAmount: payment.totalAmount,
    };
}
 
export function toDashboardListDVO(payment: Dashboard[]): DashboardView[]{
    return payment.map((payment) => toDashboardDVO(payment));
}