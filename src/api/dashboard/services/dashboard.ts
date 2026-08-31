/**
 * dashboard service
 */

import { factories } from '@strapi/strapi';
import { APICOLLECTION } from '../../../utils/constant';

const isWithinToday = (value?: string | Date | null) => {
  if (!value) return false;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  return date >= start && date <= end;
};

export default factories.createCoreService(APICOLLECTION.DASHBOARD, () => ({
  async getDashboardService() {
    const [orders, customers, cashiers] = await Promise.all([
      strapi.documents(APICOLLECTION.ORDER).findMany({
        populate: {
          customer: true,
          cashier: true,
        },
      }),
      strapi.documents(APICOLLECTION.CUSTOMER).findMany(),
      strapi.documents(APICOLLECTION.CASHIER).findMany(),
    ]);

    const todayOrders = orders.filter((order: any) =>
      isWithinToday(order.orderAt ?? order.createdAt ?? order.publishedAt)
    );

    const todayCustomers = customers.filter((customer: any) =>
      isWithinToday(customer.createdAt ?? customer.publishedAt)
    );

    const totalAmountPerDay = todayOrders.reduce((sum, order: any) => {
      const amount = Number(order.payment ?? order.total ?? 0);
      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0);

    return {
      totalOrdersPerDay: todayOrders.length,
      totalCustomersPerDay: todayCustomers.length,
      totalCashiers: cashiers.length,
      totalAmountPerDay,
    };
  },
}));
