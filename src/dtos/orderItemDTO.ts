export class OrderItemDTO {
  name?: string;
  qty?: number;
  price?: number;
  discount?: boolean;
  discountNumber?: number;
  iceChoice?: 'SEPERATED ICE' | 'NORMAL ICE' | 'LESS ICE';
  sugarLevel?: number;
  subTotal?: number;
  categories?: Array<string | number>;

  constructor(data: Partial<OrderItemDTO> = {}) {
    Object.assign(this, data);
  }
}