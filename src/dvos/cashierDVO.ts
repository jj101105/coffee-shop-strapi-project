import { Cashier, CashierView } from '../types/cashier';

export class CashierDVO {
  id?: string | number;
  documentId?: string;
  name?: string;
  phone?: string;
  workingShift?: 'MORNING' | 'AFTERNOON' | 'EVENING';
  gender?: 'MALE' | 'FEMALE';
  email?: string;
  order?: string | number | Record<string, unknown>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  publishedAt?: string | Date | null;

  constructor(data: Partial<CashierDVO> = {}) {
    Object.assign(this, data);
  }
}

export function toCashierDVO(cashier: Partial<Cashier>): CashierView {
  return {
    id: cashier.id as CashierView['id'],
    documentId: cashier.documentId,
    name: cashier.name as CashierView['name'],
    phone: cashier.phone as CashierView['phone'],
    workingShift: cashier.workingShift as CashierView['workingShift'],
    gender: cashier.gender as CashierView['gender'],
    email: cashier.email as CashierView['email'],
    order: cashier.order as CashierView['order'],
    createdAt: cashier.createdAt as CashierView['createdAt'],
    updatedAt: cashier.updatedAt as CashierView['updatedAt'],
    publishedAt: cashier.publishedAt as CashierView['publishedAt'],
  };
}

export function toCashierListDVO(cashiers: Cashier[]): CashierView[] {
  return cashiers.map((cashier) => toCashierDVO(cashier));
}
