import type { Category } from './category';

export type IceChoice = 'SEPERATED ICE' | 'NORMAL ICE' | 'LESS ICE';

export interface OrderItem {
  id: string | number;
  documentId?: string;
  name?: string;
  qty?: number;
  price?: number;
  discount?: boolean;
  discountNumber?: number | null;
  iceChoice?: IceChoice;
  sugarLevel?: number;
  subTotal?: number;
  categories?: Array<Category | string | number>;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

export interface OrderItemInput {
  name?: string;
  qty?: number;
  price?: number;
  discount?: boolean;
  discountNumber?: number;
  iceChoice?: IceChoice;
  sugarLevel?: number;
  subTotal?: number;
  categories?: Array<string | number>;
}

export interface OrderItemView extends OrderItem {}