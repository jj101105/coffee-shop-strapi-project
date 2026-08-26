export class OrderDTO {
  customer?: string | number;
  cashier?: string | number;
  total?: number;
  tax?: number;
  payment?: number;
  orderAt?: string | Date;
  order_items?: Array<string | number>;

  constructor(data: Partial<OrderDTO> = {}) {
    Object.assign(this, data);
  }
}