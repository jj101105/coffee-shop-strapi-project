/**
 * auth router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/auth/login',
      handler: 'auth.login',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/auth/profile',
      handler: 'auth.profile',
    },
  ],
};