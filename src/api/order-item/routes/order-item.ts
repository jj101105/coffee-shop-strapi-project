/**
 * order-item router
 */
export default {
    routes: [
        {
            method: 'POST',
            path: '/order-item/createOrderItem',
            handler: 'order-item.createOrderItem',
            config: {
                auth: false,
            },
        },
        {
            method: 'GET',
            path: '/order-item/getAllOrderItem',
            handler: 'order-item.getAllOrderItem',
            config: {
                auth: false,
            },
        },
        {
            method: 'GET',
            path: '/order-item/getOrderItemDetail/:documentId',
            handler: 'order-item.getOrderItemDetail',
            config: {
                auth: false,
            },
        },
        {
            method: 'PUT',
            path: '/order-item/updateOrderItem/:documentId',
            handler: 'order-item.updateOrderItem',
            config: {
                auth: false,
            },
        },
        {
            method: 'PATCH',
            path: '/order-item/updateOrderItem/:documentId',
            handler: 'order-item.updateOrderItem',
            config: {
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/order-item/updateOrderItem/:documentId',
            handler: 'order-item.updateOrderItem',
            config: {
                auth: false,
            },
        },
        {
            method: 'DELETE',
            path: '/order-item/deleteOrderItem/:documentId',
            handler: 'order-item.deleteOrderItem',
            config: {
                auth: false,
            },
        },
    ],
};