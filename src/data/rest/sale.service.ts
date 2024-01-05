import axios from "axios";
import {Constants} from "../../utils/constants";
import {ReportSale} from '../../interfaces/ReportSale';

export const saleReportAnnual = () => {
    return new Promise(((resolve, reject) => {
        axios.post(Constants.URL_MS_1 + `sale/reporte`)
            .then(((results) => results.data))
            .then((value) => resolve(value))
            .catch(e => reject(e))
    }));
}

export const generatePDFSale = (reportSale: ReportSale) => {
    return new Promise(((resolve, reject) => {
        axios.post(Constants.URL_MS_1 + `sale/reporte/pdf`, reportSale, {
          headers: {}, responseType: 'blob'
        })
          .then(((results) => results.data))
          .then((value) => {
              resolve(value);
          })
          .catch(e => reject(e))
    }));
}
