import { Category, CategoryView } from '../types/category';

export class CategoryDVO {
  id?: string | number;
  documentId?: string;
  name?: string;
  order_items?: Array<string | number | Record<string, unknown>>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  publishedAt?: string | Date | null;

  constructor(data: Partial<CategoryDVO> = {}) {
    Object.assign(this, data);
  }
}

export function toCategoryDVO(category: Partial<Category>): CategoryView {
  return {
    id: category.id,
    documentId: category.documentId,
    name: category.name,
    order_items: category.order_items,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    publishedAt: category.publishedAt,
  };
}

export function toCategoryListDVO(categories: Category[]): CategoryView[] {
  return categories.map((category) => toCategoryDVO(category));
}
