import type { Order } from './order';

export type WorkingShift = 'MORNING' | 'AFTERNOON' | 'EVENING';
export type Gender = 'MALE' | 'FEMALE';

export interface Cashier {
  id: string | number;
  documentId?: string;
  name: string;
  phone: string;
  workingShift: WorkingShift;
  gender: Gender;
  email: string;
  order?: Order | string | number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

export interface CreateCashierInput {
  name: string;
  phone: string;
  password: string;
  workingShift: WorkingShift;
  gender: Gender;
  email: string;
}

export interface CashierView extends Cashier {}