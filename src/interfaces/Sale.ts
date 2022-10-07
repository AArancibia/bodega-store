export interface Sale {
    id: string;
    salePrice: number;
    saleDetail: Array<SaleDetail>;
}

export interface SaleDetail {
    id: string;
    price: number;
    quantity: number;
    productId: string;
}
