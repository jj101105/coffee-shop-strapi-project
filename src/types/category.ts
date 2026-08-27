import type { OrderItem } from './orderItem';

export interface Category {
    id: string | number;
    documentId?: string;
    name?: string;
    order_items?: Array<string | number>;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
}

export interface CategoryView extends Category {}

export interface CategoryInput {
    name?: string;
     order_items?: Array< string | number>;
}


// export interface Category {
//   id: number;
//   documentId: string;

//   name: string;

//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateCategoryInput {
//   name?: unknown;
// }

// export interface CategoryView {
//   id: string;
//   name: string;
// }