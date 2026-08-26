export class OrderItemDVO {
  id?: string | number;
  documentId?: string;
  name?: string;
  qty?: number;
  price?: number;
  discount?: boolean;
  discountNumber?: number | null;
  iceChoice?: 'SEPERATED ICE' | 'NORMAL ICE' | 'LESS ICE';
  sugarLevel?: number;
  subTotal?: number;
  categories?: Array<string | number | Record<string, unknown>>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  publishedAt?: string | Date | null;

  constructor(data: Partial<OrderItemDVO> = {}) {
    Object.assign(this, data);
  }
}