export class CostumerDVO {
  id?: string | number;
  documentId?: string;
  name?: string;
  gender?: 'MALE' | 'FEMALE';
  phone?: string;
  orders?: Array<string | number | Record<string, unknown>>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  publishedAt?: string | Date | null;

  constructor(data: Partial<CostumerDVO> = {}) {
    Object.assign(this, data);
  }
}