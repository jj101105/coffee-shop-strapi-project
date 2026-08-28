/**
 * costumer router
 */
export default {
    routes: [
        {
          method: 'POST',
          path: '/costumer/createCostumer',
          handler: 'costumer.createCostumer',
          config: { auth: false },
        },
        {
          method: 'GET',
          path: '/costumer/getAllCostumer',
          handler: 'costumer.getAllCostumer',
          config: { auth: false },
        },
        {
          method: 'GET',
          path: '/costumer/getCostumerDetail/:documentId',
          handler: 'costumer.getCostumerDetail',
          config: { auth: false },
        },
        {
          method: 'PUT',
          path: '/costumer/updateCostumer/:documentId',
          handler: 'costumer.updateCostumer',
          config: { auth: false },
        },
        {
          method: 'DELETE',
          path: '/costumer/deleteCostumer/:documentId',
          handler: 'costumer.deleteCostumer',
          config: { auth: false },
        },
      ],
    };