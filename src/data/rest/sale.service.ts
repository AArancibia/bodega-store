import axios from "axios";
import {Constants} from "../../utils/constants";
import {CartItem} from "../../interfaces/CartItem";
import {Sale, SaleDetail} from "../../interfaces/Sale";
import {v4 as uuidV4} from 'uuid';
import {ReportSale} from '../../interfaces/ReportSale';
import {User} from '../../interfaces/user/User';

export const saveSale = (cartItems: Array<CartItem>, salePrice: number, user: User) => {
    const saleDetail: Array<SaleDetail> = cartItems.map(x => ({
        id: uuidV4(),
        price: x.product.unitPrice,
        quantity: x.count,
        productId: x.product.id,
    }));
    const sale: Sale = {
        id: uuidV4(),
        saleDetail,
        dateRegister: new Date().toISOString(),
        salePrice,
        user: user
    };
    return new Promise(((resolve, reject) => {
        axios.post(Constants.URL_MS_2 + `sale`, sale)
            .then(((results) => results.data))
            .then((value) => resolve(value))
            .catch(e => reject(e))
    }));
}

export const saleReportAnnual = () => {
    return new Promise(((resolve, reject) => {
        axios.post(Constants.URL_MS_2 + `sale/reporte`)
            .then(((results) => results.data))
            .then((value) => resolve(value))
            .catch(e => reject(e))
    }));
}

export const generatePDFSale = (reportSale: ReportSale) => {
    return new Promise(((resolve, reject) => {
        axios.post(Constants.URL_MS_2 + `sale/reporte/pdf`, reportSale, {
          headers: {}, responseType: 'blob'
        })
          .then(((results) => results.data))
          .then((value) => {
              resolve(value);
          })
          .catch(e => reject(e))
    }));
}
