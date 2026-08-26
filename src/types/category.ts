import type { OrderItem } from './orderItem';

export interface Category {
    id: string | number;
    documentId?: string;
    name?: string;
    order_items?: Array<OrderItem | string | number>;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
}

export interface CategoryView extends Category {}

export interface CategoryInput {
    name?: string;
    order_items?: Array<string | number>;
}