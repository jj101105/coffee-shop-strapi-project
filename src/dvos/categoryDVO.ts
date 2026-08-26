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
