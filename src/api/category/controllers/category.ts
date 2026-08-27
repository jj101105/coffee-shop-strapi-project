/**
 * category controller
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { categoryResponse, getCategoryDTO } from '../../../utils/categoryHelper';
import { HTTPCODE } from '../../../utils/devCode';
import { createResponse } from '../../../utils/requestResponse';



export default factories.createCoreController(APICOLLECTION.CATEGORY, () => ({
  async createCategory(ctx: any) {
    try {
      const category = await strapi.service(APICOLLECTION.CATEGORY).createCategoryService(getCategoryDTO(ctx));
      return createResponse({
        ctx,
        httpCode: HTTPCODE.CREATED,
        devCode: HTTPCODE.CREATED,
        message: 'Create category successfully',
        data: category,
      });
    } catch (error) {
      throw Error("Error while creating category data: " + error);
    }
      },

  async categoryList(ctx: any) {
    try {
      const categories = await strapi.service(APICOLLECTION.CATEGORY).getAllCategoryService();
      return createResponse({
        ctx,
        httpCode: HTTPCODE.SUCCESS,
        devCode: HTTPCODE.SUCCESS,
        message: 'Get all categories successfully',
        data: categories
      });
    } catch (error) {
      throw Error("Error while fetching category data: " + error);
    }
  },

  async getCategoryDetail(ctx: any) {
    try {
      const category = await strapi.service(APICOLLECTION.CATEGORY).getCategoryDetailService(ctx.params.documentId);
      if (!category) return ctx.notFound('Category not found');
      return createResponse({
        ctx,
        httpCode: HTTPCODE.SUCCESS,
        devCode: HTTPCODE.SUCCESS,
        message: 'Get category successfully',
        data: category
      });
    } catch (error) {
      throw Error("Error while fetching category data: " + error);
    }
  },

  async updateCategory(ctx: any) {
    try {
      const category = await strapi.service(APICOLLECTION.CATEGORY).updateCategoryService(
        ctx.params.documentId,
        getCategoryDTO(ctx),
      );
      return createResponse({
        ctx,
        httpCode: HTTPCODE.SUCCESS,
        devCode: HTTPCODE.SUCCESS,
        message: 'Update category successfully',
        data: category
      });
    } catch (error) {
      throw Error("Error while updating category data: " + error);
    }
  },

  async deleteCategory(ctx: any) {
    try {
      const category = await strapi.service(APICOLLECTION.CATEGORY).deleteCategoryService(ctx.params.documentId);
      if (!category) return ctx.notFound('Category not found');
      return createResponse({
        ctx,
        httpCode: HTTPCODE.SUCCESS,
        devCode: HTTPCODE.SUCCESS,
        message: 'Delete category successfully',
        data: category
      });
    } catch (error) {
      throw Error("Error while deleting category data: " + error);
    }
  },
}));
