// export class toCategoryDVO {
// 	id?: string | number;
// 	documentId?: string;
// 	name?: string;
// 	order_items?: Array<string | number | Record<string, unknown>>;
// 	createdAt?: string | Date;
// 	updatedAt?: string | Date;
// 	publishedAt?: string | Date | null;

// 	constructor(data: Partial<toCategoryDVO> = {}) {
// 		Object.assign(this, data);
// 	}
// }

import { Category, CategoryView } from "../types/category";

export function toCategoryDVO(category: Category): CategoryView{
	return {
		id: category.id,
		documentId :category.documentId,
		name: category.name,
		order_items: category.order_items,
		createdAt: category.createdAt,
		updatedAt: category.updatedAt,
		publishedAt: category.publishedAt
	}
}
export function toCategoryListDVO (category: Category[]): CategoryView[] {
	return category.map(toCategoryDVO)
}
