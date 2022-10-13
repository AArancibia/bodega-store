import axios from "axios";
import {Constants} from "../../utils/constants";
import {CartItem} from "../../interfaces/CartItem";
import {Sale, SaleDetail} from "../../interfaces/Sale";
import {v4 as uuidV4} from 'uuid';

export const saveSale = (cartItems: Array<CartItem>, salePrice: number) => {
    const saleDetail: Array<SaleDetail> = cartItems.map(x => ({
        id: uuidV4(),
        price: x.product.unitPrice,
        quantity: x.count,
        productId: x.product.id,
    }));
    const sale: Sale = {
        id: uuidV4(),
        saleDetail,
        salePrice
    };
    return new Promise(((resolve, reject) => {
        axios.post(Constants.URL + `sale`, sale)
            .then(((results) => results.data))
            .then((value) => resolve(value))
            .catch(e => reject(e))
    }));
}

export const saleReportAnnual = () => {
    return new Promise(((resolve, reject) => {
        axios.post(Constants.URL + `sale/reporte`)
            .then(((results) => results.data))
            .then((value) => resolve(value))
            .catch(e => reject(e))
    }));
}
