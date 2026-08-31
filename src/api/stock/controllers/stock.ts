/**
 * stock controller
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';
import { getStockDTO } from '../../../utils/stockHelper';
import { createResponse } from '../../../utils/requestResponse';
import { HTTPCODE } from '../../../utils/devCode';
import { error } from 'console';
import { SearchByProdName } from '../../../dtos/stockDTO';

export default factories.createCoreController('api::stock.stock', ({ strapi }) => ({

    async createStock(ctx: any) {
        try {
            const stock = await strapi.service(APICOLLECTION.STOCK).createStockService(getStockDTO(ctx));
            return createResponse({
                ctx,
                httpCode: HTTPCODE.CREATED,
                devCode: HTTPCODE.CREATED,
                message: "Create stock successfully",
                stock
            })
        }catch(error){
            throw Error ("Error while creating stock");
        }
    },
    async getStock(ctx: any){
        try{
        const stock = await strapi.service(APICOLLECTION.STOCK).getStockServoce();
        return createResponse({
            ctx,
            httpCode: HTTPCODE.SUCCESS,
            devCode: HTTPCODE.SUCCESS,
            message: "Get stock successfully",
            data:stock
        })
    }catch(error){
        throw Error(" Error while get stock"+error);
    }
    },
    async getStockDetail(ctx: any){
        try{
            const documentId = ctx.params.documentId;
            const stock = await strapi.service(APICOLLECTION.STOCK).getDetailService(documentId);
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: "Get product detail successfully",
                data: stock
            })
        }catch(error){
            throw Error("Error while get data detail"+error);
        }
    },
    async updateStock(ctx:any){
        try{
            const documentId= ctx.params.documentId;
            const stock= await strapi.service(APICOLLECTION.STOCK).updateStockService(documentId, getStockDTO(ctx));
            return createResponse({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: "Update stock successfully",
                data: stock
            })
        }
        catch(error){
            throw Error("Error while update stock"+error);

        }
    },
    async deleteStock( ctx: any){
        try{
            const documentId= ctx.params.documentId;
            const stock = await strapi.service(APICOLLECTION.STOCK).deleteStockService(documentId);
            if (!stock) return Error("This product did not exist in the stock");
            return ({
                ctx,
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: "Delete product successfully",
                data: {}
            })
        }catch(error){
            throw Error ("Error while delete stock"+error);
        }
    },
    async searchStock(ctx:any){
        try{
           const dto: SearchByProdName= {
            productname: ctx.params.productname
           };
            const search= await strapi.service(APICOLLECTION.STOCK).searchService(dto);
            ctx.body = {
                httpCode: HTTPCODE.SUCCESS,
                devCode: HTTPCODE.SUCCESS,
                message: "Search found",
                data: search
            }
        }catch(error){
            console.log("Error while search product in strock"+error);
            throw error;
        }
    },
    async lowStock(ctx:any){
        try{
            const result= await strapi.service(APICOLLECTION.STOCK).lowStockService();
            
           ctx.body= {
            httpCode: HTTPCODE.SUCCESS,
            devCode: HTTPCODE.SUCCESS,
            message: "Low stock loaded",
            data: result
           }
           

        }catch(error){
            console.log("Error while fetching stock",error);
            throw error;
        }
    }

}));
