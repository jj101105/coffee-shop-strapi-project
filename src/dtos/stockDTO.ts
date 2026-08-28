export class StockDTO {
  productname?: string;
    quantity?: number;
    unit?: 'KG' | 'LITER' | 'PACK';
    minQuantity?: number;
    stockStatus?: 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK';
    
  constructor(data: Partial<StockDTO> = {}) {
    Object.assign(this, data);
  }
}