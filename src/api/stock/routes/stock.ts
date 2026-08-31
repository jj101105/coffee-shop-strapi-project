import { METHODS } from "http";

 export default {
    routes:[
        {
            method: 'POST',
            path: "/stock/create-stock",
            handler: "stock.createStock",
            config:{
                auth: false
            }
        },
        {
            method: 'GET',
            path: "/stock/get-stock",
            handler: "stock.getStock",
            config:{
                auth: false
            }
        },
        {
            method: 'GET',
            path: "/stock/get-stock/:documentId",
            handler: "stock.getStockDetail",
            config:{
                auth: false
            }
        },
        {
            method: 'PATCH',
            path: "/stock/update-stock/:documentId",
            handler: "stock.updateStock",
            config:{
                auth: false
            }
        },
         {
            method: 'DELETE',
            path: "/stock/delete-stock/:documentId",
            handler: "stock.deleteStock",
            config:{
                auth: false
            }
        },
        {
            method: 'GET',
            path: "/stock/search-product-stock/:productname",
            handler: "stock.searchStock",
            config:{
                auth: false
            }
        },
        //low stock notification api 
        {
            method: 'GET',
            path: "/stock/low-stock",
            handler: "stock.lowStock",
            config:{
                auth: false
            }
        }
    ]
 }