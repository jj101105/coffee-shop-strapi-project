/**
 * dashboard controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::dashboard.dashboard', ({strapi}) => ({
    async getDashboard(ctx:any){
        try{
           

        }catch(error){
            console.log("Error while fetching dadhboard",error);
            throw error;
        }
    }
}));
