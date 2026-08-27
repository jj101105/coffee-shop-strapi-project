import { CategoryDTO } from '../dtos/categoryDTO';
import { createResponse } from './requestResponse';
import { HTTPCODE } from './devCode';
import type { Category } from '../types/category';

export const CATEGORY_POPULATE = { order_items: true };

export const getCategoryDTO = (ctx: any) => {
  const body = ctx.request.body?.data ?? ctx.request.body ?? {};
  return new CategoryDTO({
    name: body.name,
    order_items: body.order_items,
  });
};

export const categoryResponse = (
  ctx: any,
  message: string,
  data: unknown,
  httpCode: number = HTTPCODE.SUCCESS,
) =>
  createResponse({
    ctx,
    httpCode,
    devCode: httpCode,
    message,
    data,
  });

export const categoryData = (dto: CategoryDTO) => {
  if (!dto.name?.trim()) {
    throw new Error('name is required');
  }

  return {
    name: dto.name.trim(),
    ...(dto.order_items === undefined ? {} : { order_items: { set: dto.order_items.map(String) } }),
  };
};

export const normalizeCategory = (category: Partial<Category>) => ({
  ...category,
  order_items: category.order_items,
});
