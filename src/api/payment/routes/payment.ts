export default{
    routes: [
        {
            method: 'POST',
            path: "/payment/get-payment",
            handler: "payment.createPayment",
            config:{
                auth: false
            }
        }
    ]
}
