export interface Stock{
    id: string | number | undefined;
    documentId: string;
    productName: string | undefined;
    quantity: string | number | undefined;
    unit?: 'KG' | 'LITER' | 'PACK';
    minQuantity: string | number | undefined;
    stockStatus?: 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK';
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
}
export interface StockInput {
    productname?: string;
    quantity?: string | number | undefined;
    unit?: 'KG' | 'LITER' | 'PACK';
    minQuantity?: string | number | undefined;
    stockStatus?: 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK';
}
export interface StockView extends Stock{}