export class StockDVO {
    
    productname?: string;
    quantity?: string | number | undefined;
    unit?: 'KG' | 'LITER' | 'PACK';
    minQuantity?: string | number | undefined;
    stockStatus?: 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK';
 
    
  constructor(data: Partial<StockDVO> = {}) {
    Object.assign(this, data);
  }
}