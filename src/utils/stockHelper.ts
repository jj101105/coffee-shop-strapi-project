import { StockDTO } from "../dtos/stockDTO";
import { StockDVO } from "../dvos/stockDVO";
import { Stock } from "../types/stock";

export const getStockDTO = (ctx: any) =>{
    const body = ctx.request.body?.data?? ctx.request.body ?? {};
    return new StockDTO ({
    productname:body.productName,
    quantity:body.quantity,
    unit:body.unit,
    minQuantity:body.minQuantity,
    stockStatus:body.stockStatus
    });
};
export const toStockDVO = (item: Partial<Stock>): StockDVO => new StockDVO({
   
    productname: item.productName,
    quantity: item.quantity,
    unit:item.unit,
    minQuantity: item.minQuantity,
    stockStatus: item.stockStatus,

})