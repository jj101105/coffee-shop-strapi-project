import type { Cashier } from './cashier';
import type { Costumer } from './costumer';
import type { OrderItem } from './orderItem';

export interface Order{
        id: string | number;
        documentId?: string;
        customer?: Costumer | string | number;
        cashier?: Cashier | string | number;
        total?: number;
        tax?: number;
        payment?: number;
        orderAt?: string;
        order_items?: Array<OrderItem | string | number>;
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string | null;
}

export interface OrderInput {
    customer?: string | number;
    cashier?: string | number;
    total?: number;
    tax?: number;
    payment?: number;
    orderAt?: string;
    order_items?: Array<string | number>;
}

export interface OrderView extends Order {}