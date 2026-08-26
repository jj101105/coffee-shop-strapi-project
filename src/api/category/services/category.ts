/**
 * category service
 */

import { factories } from '@strapi/strapi';
import { CategoryDTO } from '../../../dtos/categoryDTO';
import { CategoryDVO } from '../../../dvos/categoryDVO';
import { APICOLLECTION } from '../../../utils/constant';
import type { Category, CategoryInput } from '../../../types/category';

const populate = { order_items: true };

const toCategoryDVO = (category: Partial<Category>): CategoryDVO => new CategoryDVO({
	id: category.id,
	documentId: category.documentId,
	name: category.name,
	order_items: category.order_items as CategoryDVO['order_items'],
	createdAt: category.createdAt,
	updatedAt: category.updatedAt,
	publishedAt: category.publishedAt,
});

const categoryData = (dto: CategoryDTO | CategoryInput) => {
	if (!dto.name?.trim()) throw new Error('name is required');

	return {
		name: dto.name.trim(),
		...(dto.order_items === undefined
			? {}
			: { order_items: { set: dto.order_items.map(String) } }),
	};
};

export default factories.createCoreService(APICOLLECTION.CATEGORY, () => ({
	async createCategoryService(dto: CategoryDTO | CategoryInput) {
		const category = await strapi.documents(APICOLLECTION.CATEGORY).create({
			data: categoryData(dto),
			populate,
			status: 'published',
		});
		return toCategoryDVO(category as Partial<Category>);
	},

	async getAllCategoryService() {
		const categories = await strapi.documents(APICOLLECTION.CATEGORY).findMany({ populate });
		return categories.map((category) => toCategoryDVO(category as Partial<Category>));
	},

	async getCategoryDetailService(documentId: string) {
		const category = await strapi.documents(APICOLLECTION.CATEGORY).findOne({ documentId, populate });
		return category ? toCategoryDVO(category as Partial<Category>) : null;
	},

	async updateCategoryService(documentId: string, dto: CategoryDTO) {
		const currentCategory = await strapi.documents(APICOLLECTION.CATEGORY).findOne({ documentId });
		if (!currentCategory) throw new Error(`Category with documentId ${documentId} was not found`);

		const current = currentCategory as Partial<Category>;
		const data: Record<string, unknown> = {
			name: dto.name?.trim() ?? current.name,
		};
		if (!String(data.name).trim()) throw new Error('name is required');
		if (dto.order_items !== undefined) {
			data.order_items = { set: dto.order_items.map(String) };
		}

		const category = await strapi.documents(APICOLLECTION.CATEGORY).update({
			documentId,
			data,
			populate,
		});
		return toCategoryDVO(category as Partial<Category>);
	},

	async deleteCategoryService(documentId: string) {
		const category = await strapi.documents(APICOLLECTION.CATEGORY).delete({ documentId });
		return category ? toCategoryDVO(category as Partial<Category>) : null;
	},
}));
