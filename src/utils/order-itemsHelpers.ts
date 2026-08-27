import { OrderItemDTO } from "../dtos/orderItemDTO";
import { OrderItemDVO } from "../dvos/orderItemDVO";
import { OrderItem } from "../types/orderItem";

export const getOrderItemDTO = (ctx: any) => {
    const body = ctx.request.body?.data ?? ctx.request.body ?? {};
    return new OrderItemDTO({
        name: body.name,
        qty: body.qty,
        price: body.price,
        discount: body.discount,
        discountNumber: body.discountNumber,
        iceChoice: body.iceChoice,
        sugarLevel: body.sugarLevel,
        categories: body.categories,
    });
};

export const populate = { categories: true };

export const toOrderItemDVO = (item: Partial<OrderItem>): OrderItemDVO => new OrderItemDVO({
    id: item.id,
    documentId: item.documentId,
    name: item.name,
    qty: item.qty,
    price: item.price,
    discount: item.discount,
    discountNumber: item.discountNumber,
    iceChoice: item.iceChoice,
    sugarLevel: item.sugarLevel,
    subTotal: item.subTotal,
    categories: item.categories as OrderItemDVO['categories'],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    publishedAt: item.publishedAt,
});
