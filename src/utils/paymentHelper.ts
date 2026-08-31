import { PaymentDTO } from "../dtos/paymentDTO";

export const getPaymentDTO = (ctx: any) => {
  const body = ctx.request.body?.data ?? ctx.request.body ?? {};
  return new PaymentDTO({
    paymentMethod: body.paymentMethod,
    paymentStatus: body.paymentStatus,
    amount: body.amount,
    order: body.order ?? body.order,
    paymentedAt: body.paymentedAt,

  });
};
