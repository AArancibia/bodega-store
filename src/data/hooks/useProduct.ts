import { useEffect, useState } from 'react';
import { getProducts } from '../rest/product.service';
import { onChangeArgs } from 'ajas-product-card/src/interfaces/interfaces';
import { Product } from '../../domain/interfaces/Product';
import { CartItem } from '../../domain/interfaces/CartItem';

interface Props {
  addCartItem?: (cartItem: CartItem) => void;
  removeCartItem?: (id: string) => void;
}

export const useProduct = ({addCartItem, removeCartItem}: Props) => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    getProducts()
      .then((products) => setProducts(products))
      .catch();
  }, []);

  const onHandleChange = ({product: selectedProduct, count}: onChangeArgs) => {
    if (count === 0) {
      removeCartItem && removeCartItem(selectedProduct.id);
      return;
    }
    const product = products.find(x => x.id === selectedProduct.id);
    if (product) {
      count--;
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
