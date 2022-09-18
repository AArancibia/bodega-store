import React from 'react';
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from 'ajas-product-card';
import { Product } from '../../interfaces/Product';
import { CartItem } from '../../interfaces/CartItem';
import { useProduct } from '../../data/hooks/useProduct';
import { setProducts } from '../../redux/product/product.actions';
import { addCartItem } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selector';
import './Directory.component.scss';

interface Props {
  cartItems: Array<CartItem>
  addCartItem: (cartItems: CartItem) => void;
}

const DirectoryComponent = ({cartItems, addCartItem}: Props) => {
  const {products, onHandleChange} = useProduct({addCartItem});
  setProducts(products);
  return (
    <>
      {
        products.length && products.map(product => {
          const value = cartItems.find(x => x.product.id === product.id)?.count || 0;
          return (
            <ProductCard
              key={product.id}
              product={({
                title: product.name,
                img: product.image,
                id: product.id
              })}
              onChange={onHandleChange}
              initialValues={{
                maxCount: product.quantity
              }}
              value={value}
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
                  <ProductButtons className="product_button"></ProductButtons>
                </>
              )}
            </ProductCard>
          )
        })
      }
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch: any) => ({
  setProducts: (products: Array<Product>) => dispatch(setProducts(products)),
  addCartItem: (cartItem: CartItem) => dispatch(addCartItem(cartItem)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryComponent);
