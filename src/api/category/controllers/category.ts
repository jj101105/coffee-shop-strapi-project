/**
 * category controller
 */

import { factories } from '@strapi/strapi';
import { CategoryDTO } from '../../../dtos/categoryDTO';
import { APICOLLECTION } from '../../../utils/constant';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';

const getCategoryDTO = (ctx: any) => {
    const body = ctx.request.body?.data ?? ctx.request.body ?? {};
    return new CategoryDTO({
        name: body.name,
        order_items: body.order_items ?? body.orderItems,
    });
};

const response = (ctx: any, message: string, data: unknown, httpCode: number = HTTPCODE.SUCCESS) =>
    createResponse({ ctx, httpCode, devCode: httpCode, message, data });

export default factories.createCoreController(APICOLLECTION.CATEGORY, () => ({
    async createCategory(ctx: any) {
        const category = await strapi.service(APICOLLECTION.CATEGORY).createCategoryService(getCategoryDTO(ctx));
        return response(ctx, 'Create category successfully', category, HTTPCODE.CREATED);
    },

    async categoryList(ctx: any) {
        const categories = await strapi.service(APICOLLECTION.CATEGORY).getAllCategoryService();
        return response(ctx, 'Get all categories successfully', categories);
    },

    async getAllCategory(ctx: any) {
        const categories = await strapi.service(APICOLLECTION.CATEGORY).getAllCategoryService();
        return response(ctx, 'Get all categories successfully', categories);
    },

    async getCategoryDetail(ctx: any) {
        const category = await strapi.service(APICOLLECTION.CATEGORY).getCategoryDetailService(ctx.params.documentId);
        if (!category) return ctx.notFound('Category not found');
        return response(ctx, 'Get category successfully', category);
    },

    async updateCategory(ctx: any) {
        const category = await strapi.service(APICOLLECTION.CATEGORY).updateCategoryService(ctx.params.documentId, getCategoryDTO(ctx));
        return response(ctx, 'Update category successfully', category);
    },

    async deleteCategory(ctx: any) {
        const category = await strapi.service(APICOLLECTION.CATEGORY).deleteCategoryService(ctx.params.documentId);
        if (!category) return ctx.notFound('Category not found');
        return response(ctx, 'Delete category successfully', category);
    },
}));
