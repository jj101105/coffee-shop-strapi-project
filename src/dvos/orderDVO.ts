export class OrderDVO {
  id?: string | number;
  documentId?: string;
  customer?: string | number | Record<string, unknown>;
  cashier?: string | number | Record<string, unknown>;
  total?: number;
  tax?: number;
  payment?: number;
  orderAt?: string | Date;
  order_items?: Array<string | number | Record<string, unknown>>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  publishedAt?: string | Date | null;

  constructor(data: Partial<OrderDVO> = {}) {
    Object.assign(this, data);
  }
}