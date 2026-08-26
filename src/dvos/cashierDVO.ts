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