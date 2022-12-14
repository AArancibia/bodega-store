import {User} from './user/User';

export interface Sale {
    id: string;
    salePrice: number;
    dateRegister: string;
    saleDetail: Array<SaleDetail>;
    user: User;
}

export interface SaleDetail {
    id: string;
    price: number;
    quantity: number;
    productId: string;
}
