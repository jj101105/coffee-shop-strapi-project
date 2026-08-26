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
    },
    {
      method: 'POST',
        path: '/cashier/updateCasheir/:documentId',
        handler: 'cashier.updateCashier',
        config: {
            auth: false
        },
    },
    {
      method: 'PUT',
      path: '/cashier/updateCashier/:documentId',
      handler: 'cashier.updateCashier',
      config: {
        auth: false
      },
    },
    {
      method: 'PATCH',
      path: '/cashier/updateCashier/:documentId',
      handler: 'cashier.updateCashier',
      config: {
        auth: false
      },
    },
    {
      method: 'POST',
      path: '/cashier/updateCashier/:documentId',
      handler: 'cashier.updateCashier',
      config: {
        auth: false
      },
    },
    { 
        method: 'DELETE',
        path: '/cashier/deleteCashier/:documentId',
        handler: 'cashier.deleteCashier',
        config: {
            auth: false
        },
    }

  ],
};