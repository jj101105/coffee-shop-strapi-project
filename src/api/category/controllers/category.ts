/**
 * category controller
 */

import { factories } from '@strapi/strapi';
import { toCategoryDTO } from '../../../dtos/categoryDTO';
import { APICOLLECTION } from '../../../utils/constant';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';
import { CategoryInput } from '../../../types/category';



export default factories.createCoreController(APICOLLECTION.CATEGORY, () => ({
    async createCategory(ctx: any) {
        try {
            const dto: CategoryInput = ctx.request.body;
            const category = await strapi.service(APICOLLECTION.CATEGORY).createCategoryService(dto);
            return createResponse({
                ctx,
                httpCode: HTTPCODE.CREATED,
                devCode: HTTPCODE.CREATED,
                message: "Category create successfully",
                category,
                status: "Published"
            })
            
        } catch (error) {
            throw Error("Error while fetching category");
        }
    },

    async categoryList(ctx: any) {
        try {
            const categories = await strapi.service(APICOLLECTION.CATEGORY).getAllCategoryService();
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: "Get categories successfully",
                categories
            })
        } catch (error) {
            throw Error("Error while fetching category")
        }
    },
    async getCategoryDetail(ctx: any) {
        try {
            const documentId = ctx.params.documentId;
            const category = await strapi.service(APICOLLECTION.CATEGORY).getCategoryDetailService(documentId);
            if (!category) return ctx.notFound('Category not found');
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: "Get category  successfully",
                category
            })
        } catch (error) {
            throw Error("Error while fetching category")
        }
    },

    async updateCategory(ctx: any) {
        try {
            const documentId = ctx.params.documentId;
            const category = await strapi.service(APICOLLECTION.CATEGORY).updateCategoryService(documentId, toCategoryDTO(ctx));
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: "Update category successfully",
                category
            })
        } catch (error) {
            throw Error("Error while fetching category")
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
                message: "Delete category successfully",
                category
            })
        } catch (error) {
            throw Error("Error while fetching category")
        }
    },
}));
