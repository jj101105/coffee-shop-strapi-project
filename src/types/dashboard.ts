import { Cashier } from "./cashier";
import { Costumer } from "./costumer";
import { Order } from "./order";


export interface Dashboard {
    id: string | number;
    documentId: string | undefined;
    order: Array<Order | string | number>;
    costumer: Array<Costumer | string |number>;
    cashier: Array<Cashier | string | number>;
    totalAmount: number |undefined;
}
export interface DashboardInput{
    order?: Array<string | number>;
    costumer?: Array<string | number>;
    cashier?: Array< string | number>;
    totalAmount?: number |undefined;
}
export interface DashboardView extends Dashboard{}