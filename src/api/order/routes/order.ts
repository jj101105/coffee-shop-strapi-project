/**
 * order router
 */

export default{
    routes: [
        {
            method: "POST",
            path: "/order/createOrder",
            handler: "order.createOrder",
            config: {
                autho: false
            }
        }
    ]
}