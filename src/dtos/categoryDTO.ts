// export class CategoryDTO {
// 	name?: string;
// 	order_items?: Array<string | number>;

// 	constructor(data: Partial<CategoryDTO> = {}) {
// 		Object.assign(this, data);

// 	}
// }
import { Category, CategoryInput } from "../types/category";

export function toCategoryDTO (category: Category): CategoryInput{
	return {
		name: category.name,
		order_items: category.order_items
	}
}
export function toCategoryListDTO(category: Category[]): CategoryInput []{
	return category.map(toCategoryDTO);
}