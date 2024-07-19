import { CartItem, Discount } from "../../../types";

export const getMaxApplicableDiscount = (item: CartItem): number => {
    const applicableDiscount = item.product.discounts
        .filter((discount) => item.quantity >= discount.quantity)
        .reduce((max, discount) => Math.max(max, discount.rate), 0);
    return applicableDiscount;
};

export const getMaxDiscount = (discounts: Discount[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getAppliedDiscount = (cartItem: CartItem) => {
    const { discounts } = cartItem.product;
    const { quantity } = cartItem;
    return discounts.reduce((appliedDiscount, discount) => {
        if (quantity >= discount.quantity) {
            return Math.max(appliedDiscount, discount.rate);
        }
        return appliedDiscount;
    }, 0);
};