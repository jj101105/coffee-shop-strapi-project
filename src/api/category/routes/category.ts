/**
 * category router
 */

import { factories } from '@strapi/strapi';

export default {
    reoutes: [
         {
            method: "GET",
            path: "/get/categoryList",
            handler: "category.categoryList",
            config: {
                auth: false,
                // middlewares: [basicAuth()],
            }
        },
    ]
}

