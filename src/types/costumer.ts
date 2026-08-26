import type { Order } from './order';

export interface Costumer {
  id: string | number;
  documentId?: string;
  name: string;
  gender?: 'MALE' | 'FEMALE';
  phone: string;
  orders?: Array<Order | string | number>;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

export interface CreateCostumerInput {
  name?: string;
  gender?: 'MALE' | 'FEMALE';
  phone?: string;
}

export interface CostumerView extends Costumer {}