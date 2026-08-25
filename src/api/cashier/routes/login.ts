/**
 * cashier authentication routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/cashier/login',
      handler: 'cashier.login',
      config: {
        auth: false,
      },
    },
  ],
};