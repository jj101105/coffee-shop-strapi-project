/**
 * costumer router
 */
export default{
    routes: [
       {
      method: 'POST',
      path: '/costumer/createCostumer',
      handler: 'costumer.createCostumer',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/costumer/getAllCostumer',
      handler: 'costumer.getAllCostumer',
      config: {
        auth: false,
      },
    },
    ]
}