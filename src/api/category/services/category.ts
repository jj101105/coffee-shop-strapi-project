/**
 * category service
 */

import { factories } from '@strapi/strapi';
import { CategoryDTO } from '../../../dtos/categoryDTO';
import { toCategoryDVO } from '../../../dvos/categoryDVO';
import { APICOLLECTION } from '../../../utils/constant';
import { CATEGORY_POPULATE, categoryData } from '../../../utils/categoryHelper';
import type { Category } from '../../../types/category';

export default factories.createCoreService(APICOLLECTION.CATEGORY, () => ({

	
  async createCategoryService(dto: CategoryDTO) {
    const category = await strapi.documents(APICOLLECTION.CATEGORY).create({
      data: categoryData(dto),
      populate: CATEGORY_POPULATE,
      status: 'published',
    });

    return toCategoryDVO(category as Partial<Category>);
  },

  async getAllCategoryService() {
    const categories = await strapi.documents(APICOLLECTION.CATEGORY).findMany({ populate: CATEGORY_POPULATE });
    return categories.map((category) => toCategoryDVO(category as Partial<Category>));
  },

  async getCategoryDetailService(documentId: string) {
    const category = await strapi.documents(APICOLLECTION.CATEGORY).findOne({
      documentId,
      populate: CATEGORY_POPULATE,
    });
    return category ? toCategoryDVO(category as Partial<Category>) : null;
  },

  async updateCategoryService(documentId: string, dto: CategoryDTO) {
    const currentCategory = await strapi.documents(APICOLLECTION.CATEGORY).findOne({ documentId });
    if (!currentCategory) {
      throw new Error(`Category with documentId ${documentId} was not found`);
    }

    const current = currentCategory as Partial<Category>;
    const data: Record<string, unknown> = {
      name: dto.name?.trim() ?? current.name,
    };

    if (!String(data.name).trim()) {
      throw new Error('name is required');
    }

    if (dto.order_items !== undefined) {
      data.order_items = { set: dto.order_items.map(String) };
    }

    const category = await strapi.documents(APICOLLECTION.CATEGORY).update({
      documentId,
      data,
      populate: CATEGORY_POPULATE,
    });

    return toCategoryDVO(category as Partial<Category>);
  },

  async deleteCategoryService(documentId: string) {
    const category = await strapi.documents(APICOLLECTION.CATEGORY).delete({ documentId });
    return category ? toCategoryDVO(category as Partial<Category>) : null;
  },
}));
