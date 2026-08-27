export interface Category {
  id?: string | number;
  documentId?: string;
  name?: string;
  order_items?: Array<string | number | Record<string, unknown>>;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

export interface CategoryView extends Category {}