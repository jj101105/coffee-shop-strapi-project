/**
 * cashier router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/cashier/createCashier',
      handler: 'cashier.createCashier',
      config: {
        auth: false,
      },
    },
    { 
        method: 'GET',
        path: '/cashier/getAllCashier',
        handler: 'cashier.getAllCashier',
        config: {
            auth: false
        },
    },
    { 
        method: 'GET',
        path: '/cashier/getCashierDetail/:documentId',
        handler: 'cashier.getCashierDetail',
        config: {
            auth: false
        },
    }

  ],
};