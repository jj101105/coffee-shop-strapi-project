/**
 * order-item service
 */

import { factories } from '@strapi/strapi';
import { OrderItemDTO } from '../../../dtos/orderItemDTO';
import { OrderItemDVO } from '../../../dvos/orderItemDVO';
import { APICOLLECTION } from '../../../utils/constant';
import type { OrderItem, OrderItemInput } from '../../../types/orderItem';

const populate = { categories: true };

const toOrderItemDVO = (item: Partial<OrderItem>): OrderItemDVO => new OrderItemDVO({
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

const calculateItem = (dto: OrderItemDTO | OrderItemInput) => {
    const price = Number(dto.price);
    const qty = Number(dto.qty);
    const discount = dto.discount === true;
    const discountNumber = discount ? Number(dto.discountNumber ?? 0) : 0;

    if (!Number.isFinite(price) || price < 0) throw new Error('Price cannot be negative');
    if (!Number.isInteger(qty) || qty <= 0) throw new Error('Quantity must be greater than 0');
    if (!Number.isFinite(discountNumber) || discountNumber < 0 || discountNumber > 100) {
        throw new Error('Discount must be between 0 and 100 percent');
    }

    const grossTotal = qty * price;
    return {
        qty,
        price,
        discount,
        discountNumber,
        subTotal: grossTotal - (grossTotal * discountNumber / 100),
    };
};

const relationData = (categories?: Array<string | number>) =>
    categories === undefined ? {} : { categories: { set: categories.map(String) } };

export default factories.createCoreService(APICOLLECTION.ORDER_ITEM, () => ({
    async createOrderItemService(dto: OrderItemDTO | OrderItemInput) {
        const item = await strapi.documents(APICOLLECTION.ORDER_ITEM).create({
            data: {
                name: dto.name,
                iceChoice: dto.iceChoice,
                sugarLevel: dto.sugarLevel,
                ...calculateItem(dto),
                ...relationData(dto.categories),
            },
            populate,
            status: 'published',
        });
        return toOrderItemDVO(item as Partial<OrderItem>);
    },

    async getAllOrderItemService() {
        const items = await strapi.documents(APICOLLECTION.ORDER_ITEM).findMany({ populate });
        return items.map((item) => toOrderItemDVO(item as Partial<OrderItem>));
    },

    async getOrderItemDetailService(documentId: string) {
        const item = await strapi.documents(APICOLLECTION.ORDER_ITEM).findOne({ documentId, populate });
        return item ? toOrderItemDVO(item as Partial<OrderItem>) : null;
    },

    async updateOrderItemService(documentId: string, dto: OrderItemDTO) {
        const currentItem = await strapi.documents(APICOLLECTION.ORDER_ITEM).findOne({
            documentId,
            populate,
        });
        if (!currentItem) throw new Error(`Order item with documentId ${documentId} was not found`);

        const current = currentItem as Partial<OrderItem>;
        const itemData = calculateItem({
            name: dto.name ?? current.name,
            qty: dto.qty ?? current.qty,
            price: dto.price ?? current.price,
            discount: dto.discount ?? current.discount,
            discountNumber: dto.discountNumber ?? current.discountNumber ?? undefined,
        });
        const data: Record<string, unknown> = {
            ...itemData,
            ...(dto.name !== undefined ? { name: dto.name } : {}),
            ...(dto.iceChoice !== undefined ? { iceChoice: dto.iceChoice } : {}),
            ...(dto.sugarLevel !== undefined ? { sugarLevel: dto.sugarLevel } : {}),
            ...relationData(dto.categories),
        };
        const item = await strapi.documents(APICOLLECTION.ORDER_ITEM).update({
            documentId,
            data,
            populate,
        });
        return toOrderItemDVO(item as Partial<OrderItem>);
    },

    async deleteOrderItemService(documentId: string) {
        const item = await strapi.documents(APICOLLECTION.ORDER_ITEM).delete({ documentId });
        return item ? toOrderItemDVO(item as Partial<OrderItem>) : null;
    },
}));
