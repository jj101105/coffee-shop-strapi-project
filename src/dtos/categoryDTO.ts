export class CategoryDTO {
	name?: string;
	order_items?: Array<string | number>;

	constructor(data: Partial<CategoryDTO> = {}) {
		Object.assign(this, data);
	}
}
