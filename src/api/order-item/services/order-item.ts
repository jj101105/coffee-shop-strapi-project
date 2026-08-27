/**
 * order-item service
 */

import { factories } from '@strapi/strapi';
import { OrderItemDTO } from '../../../dtos/orderItemDTO';
import { OrderItemDVO } from '../../../dvos/orderItemDVO';
import { APICOLLECTION } from '../../../utils/constant';
import type { OrderItem, OrderItemInput } from '../../../types/orderItem';
import { populate, toOrderItemDVO } from '../../../utils/order-itemsHelpers';


const calculateItem = (dto: Partial<OrderItemDTO | OrderItemInput>) => {
    const qty = Number(dto.qty ?? 0);
    const price = Number(dto.price ?? 0);
    const discount = Boolean(dto.discount);
    const discountNumber = Number(dto.discountNumber ?? 0);
    const subTotal = qty * price;

    if (!dto.name?.trim()) {
        throw new Error('name is required');
    }
    if (!Number.isFinite(qty) || qty <= 0) {
        throw new Error('qty must be greater than 0');
    }
    if (!Number.isFinite(price) || price < 0) {
        throw new Error('price must be greater than or equal to 0');
    }

    const computedTotal = discount ? Math.max(subTotal - discountNumber, 0) : subTotal;

    return {
        name: dto.name.trim(),
        qty,
        price,
        discount,
        discountNumber: discount ? discountNumber : 0,
        subTotal: computedTotal,
    };
};

const relationData = (categories?: Array<string | number>) => {
    if (!categories || categories.length === 0) return {};
    return {
        categories: { set: categories.map(String) },
    };
};

export default factories.createCoreService(APICOLLECTION.ORDER_ITEM, () => ({
    async createOrderItemService(dto: OrderItemDTO | OrderItemInput) {
        const item = await strapi.documents(APICOLLECTION.ORDER_ITEM).create({
            data: {
                ...calculateItem(dto),
                ...(dto.iceChoice !== undefined ? { iceChoice: dto.iceChoice } : {}),
                ...(dto.sugarLevel !== undefined ? { sugarLevel: dto.sugarLevel } : {}),
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
