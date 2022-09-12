import { useEffect, useState } from 'react';
import { getProducts } from '../rest/product.service';
import { onChangeArgs } from 'ajas-product-card/src/interfaces/interfaces';

export const useProduct = () => {
  const [products, setProducts] = useState<Array<any>>([]);
  useEffect(() => {
    getProducts()
      .then((products) => setProducts(products))
      .catch()
  }, []);

  const onHandleChange = (changeArgs: onChangeArgs) => {
    console.log(changeArgs);
  }

  return {
    products,
    onHandleChange,
  }
}
