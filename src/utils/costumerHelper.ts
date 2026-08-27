import { CostumerDTO } from '../dtos/costumerDTO';
import type { Costumer, CreateCostumerInput } from '../types/costumer';

export const CUSTOMER_POPULATE = { orders: true };

export const getCustomerDTO = (ctx: any) => {
  const body = ctx.request.body?.data ?? ctx.request.body ?? {};
  return new CostumerDTO({
    name: body.name,
    gender: body.gender,
    phone: body.phone,
  });
};

export const customerData = (dto: CostumerDTO | CreateCostumerInput) => {
  if (!dto.name?.trim() || !dto.phone?.trim()) {
    throw new Error('name and phone are required');
  }

  return {
    name: dto.name.trim(),
    phone: dto.phone.trim(),
    ...(dto.gender !== undefined ? { gender: dto.gender } : {}),
  };
};

export const normalizeCustomer = (customer: Partial<Costumer>) => ({
  ...customer,
  orders: customer.orders,
});
