/**
 * stock service
 */

import { factories } from '@strapi/strapi';
import { Stock, StockInput } from '../../../types/stock';
import { StockDTO } from '../../../dtos/stockDTO';
import { APICOLLECTION } from '../../../utils/constant';
import { toStockDVO } from '../../../utils/stockHelper';
import { createResponse } from '../../../utils/requestResponse';
import stock from '../controllers/stock';
import { appendFile } from 'fs';


export default factories.createCoreService('api::stock.stock', ({strapi}) =>({
    async createStockService (dto: StockDTO | StockInput){
        const stock= await strapi.documents(APICOLLECTION.STOCK).create({
            data: {
                productName: dto.productname,
                quantity: dto.quantity,
                unit: dto.unit,
                minQuantity: dto.minQuantity,
                stockStatus: dto.stockStatus,
            },
            status: 'published',
        });

        return stock;
    },
    async getStockServoce(){
        const stock = await strapi.documents(APICOLLECTION.STOCK).findMany();
        console.log("Stock from db",stock);

        return stock.map((stock)=> toStockDVO(stock as Partial<Stock>));
    },
    async getDetailService(documentId){
        const stock = await strapi.documents(APICOLLECTION.STOCK).findOne({documentId});
        console.log("data from db:", stock);
        return stock? toStockDVO(stock as Partial<Stock>): null;
    },
    async updateStockService(documentId: string, dto: StockDTO){
        const currentStock= await strapi.documents(APICOLLECTION.STOCK).findOne({documentId});
        if(!currentStock) return Error ("This product not exist in the stock");
        const current = currentStock as Partial<Stock>;
        const data: Record<string, unknown> = {
            productname: dto.productname?.trim()?? current.productName,
            quantity: dto.quantity?? current.quantity,
            unit: dto.unit?? current.unit,
            minQuantity: dto.minQuantity?? current.minQuantity,
            stockStatus: dto.stockStatus?? current.stockStatus
        };
        const stock= await strapi.documents(APICOLLECTION.STOCK).update({
            documentId,
            data,
        })
        return toStockDVO(stock as Partial<Stock>);
    },
    async deleteStockService(documentId){
        const stock = await strapi.documents(APICOLLECTION.STOCK).delete({documentId});
        return stock? toStockDVO(stock as Partial<Stock>): null;
    },
    //search stock by product name
    async searchService( dto: StockDTO){
        const search= await strapi.documents(APICOLLECTION.STOCK).findMany({
          filters:{
                productName:{
                      $containsi: dto.productname,
                }
          },
        });
        const StockView= search.map((item) => ({
            productname: item.productName,
            quantity: item.quantity,
            unit: item.unit,
            minQuantity: item.minQuantity,
            stockStatus: item.stockStatus
        }))
        return StockView

    },

    //low stock notification api
    async lowStockService(){
        const result= await strapi.documents(APICOLLECTION.STOCK).findMany();
   
        const lowStock= result.filter((item) =>{
    
            if(item.quantity == null || item.minQuantity == null){
                return false
            }
            return  item.quantity <= item.minQuantity
    });
        return lowStock.map((item)=>({
            productname: item.productName,
            quantity: item.quantity,
            unit: item.unit,
            minQuantity: item.minQuantity,
            stockStatus: 'Low stock'
        }))
    }
}));
