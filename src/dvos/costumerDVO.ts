import { Costumer, CostumerView } from "../types/costumer";

export class CostumerDVO {
  id?: string | number | undefined;
  documentId?: string;
  name?: string;
  gender?: 'MALE' | 'FEMALE';
  phone?: string;
  orders?: Array<string | number | Record<string, unknown>> [] | undefined;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  publishedAt?: string | Date | null;

  constructor(data: Partial<CostumerDVO> = {}) {
    Object.assign(this, data);
  }
}


export function toCostumerDVO(costumer: Partial<Costumer>): CostumerView {
  return{
    id: costumer.id,
    documentId: costumer.documentId,
    name:costumer.name,
    gender: costumer.gender,
    phone: costumer.phone,
    orders: costumer.orders as unknown as CostumerView['orders'],
    createdAt: costumer.createdAt,
    updatedAt: costumer.updatedAt,
    publishedAt: costumer.publishedAt,
  }
}
export function toCostumerListDVO(categories: Costumer[]): CostumerView[] {
  return categories.map((category) => toCostumerDVO(category));
}

