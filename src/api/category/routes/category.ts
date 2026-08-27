/**
 * category router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/category/createCategory',
      handler: 'category.createCategory',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/category/getAllCategory',
      handler: 'category.categoryList',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/category/getCategoryDetail/:documentId',
      handler: 'category.getCategoryDetail',
      config: { auth: false },
    },
    {
      method: 'PUT',
      path: '/category/updateCategory/:documentId',
      handler: 'category.updateCategory',
      config: { auth: false },
    },
    {
      method: 'DELETE',
      path: '/category/deleteCategory/:documentId',
      handler: 'category.deleteCategory',
      config: { auth: false },
    },
  ],
};

