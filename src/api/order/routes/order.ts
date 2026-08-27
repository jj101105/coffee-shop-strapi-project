/**
 * order router
 */

export default {
    routes: [
        {
            method: 'POST',
            path: '/order/createOrder',
            handler: 'order.createOrder',
            config: {
                auth: false,
            },
        },
        {
            method: 'GET',
            path: '/order/getAllOrder',
            handler: 'order.getAllOrder',
            config: {
                auth: false,
            },
        },
        {
            method: 'GET',
            path: '/order/getOrderDetail/:documentId',
            handler: 'order.getOrderDetail',
            config: {
                auth: false,
            },
        },
        {
            method: 'PUT',
            path: '/order/updateOrder/:documentId',
            handler: 'order.updateOrder',
            config: {
                auth: false,
            },
        },
        
        {
            method: 'DELETE',
            path: '/order/deleteOrder/:documentId',
            handler: 'order.deleteOrder',
            config: {
                auth: false,
            },
        },
    ],
};
