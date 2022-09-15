import { useEffect, useState } from 'react';
import { getProducts } from '../rest/product.service';
import { onChangeArgs } from 'ajas-product-card/src/interfaces/interfaces';
import { Product } from '../../interfaces/Product';
import { CartItem } from '../../interfaces/CartItem';

interface Props {
  addCartItem?: (cartItem: CartItem) => void;
}

export const useProduct = ({addCartItem}: Props) => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    getProducts()
      .then((products) => setProducts(products))
      .catch();
  }, []);

  const onHandleChange = ({product: selectedProduct, count}: onChangeArgs) => {
    const product = products.find(x => x.id === selectedProduct.id);
    if (product) {
      const cartItem = {
        product: {
          ...product,
        },
        count,
      } as CartItem;
      addCartItem && addCartItem(cartItem);
    }
  }

  return {
    products,
    onHandleChange,
  }
}
