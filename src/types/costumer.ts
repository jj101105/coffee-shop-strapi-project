import type { Order } from './order';

export interface Costumer {
  id: string | number | undefined;
  documentId?: string;
  name: string | undefined;
  gender?: 'MALE' | 'FEMALE';
  phone: string | undefined;
  orders?: Array<Order | string | number |Record<string, undefined> >[] | undefined;
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