import axios from 'axios';
import { Constants } from '../../utils/constants';
import {CreateProductDto} from '../dto/create-product.dto';

export const getProducts = (): Promise<Array<any>> => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL_MS_2 + 'products', {
    })
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const saveProduct = (product: CreateProductDto): Promise<Array<any>> => {
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + 'products', product)
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const deleteProduct = (id: string): Promise<any> => {
  return new Promise(((resolve, reject) => {
    axios.delete(Constants.URL_MS_2 + `products/${id}`, {
    })
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const getCategories = (): Promise<Array<any>> => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL_MS_1 + 'categories', {
    })
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}
