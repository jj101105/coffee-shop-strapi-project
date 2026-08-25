/**
 * order-item router
 */
export default{
    routes: [
        {
            method: "POST",
            path: "/order-item/createOrderItem",
            handler: "order-item.createOrderItem",
            config: {
                autho: false
            }
        }
    ]
}