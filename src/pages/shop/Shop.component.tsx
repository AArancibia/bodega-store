import React from 'react';
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from 'ajas-product-card';
import './Shop.component.styles.scss';
import { useProduct } from '../../data/hooks/useProduct';
import { connect } from 'react-redux';
import { setProducts } from '../../redux/product/product.actions';
import { Product } from '../../interfaces/Product';
import { CartItem } from '../../interfaces/CartItem';
import { addCartItem } from '../../redux/cart/cart.actions';

interface Props {
  setProducts: (products: Array<Product>) => void;
  addCartItem: (cartItems: CartItem) => void;
}

const ShopPage = ({setProducts, addCartItem}: Props) => {

  const {products, onHandleChange} = useProduct({addCartItem});
  setProducts(products);

  return (
    <div className="shop">
      <div className="product__item">
      {
        products.length && products.map(product => (
          <ProductCard
            product={({
              title: product.name,
              img: product.image,
              id: product.id
            })}
            onChange={onHandleChange}
            initialValues={{
              count: 4,
              maxCount: product.quantity
            }}
             style={{
               height: '325px',
               margin: '5px 20px',
             }}
          >
            {({
                reset,
                increaseBy,
                count,
                isMaxCountReached,
                product: modified,
                maxCount,
              }) => (
              <>
                <ProductImage img={product.image}></ProductImage>
                <ProductTitle title={product.name}></ProductTitle>
                <ProductButtons></ProductButtons>
              </>
            )}
          </ProductCard>
        ))
      }
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setProducts: (products: Array<Product>) => dispatch(setProducts(products)),
  addCartItem: (cartItem: CartItem) => dispatch(addCartItem(cartItem)),
})

export default connect(null, mapDispatchToProps)(ShopPage);
