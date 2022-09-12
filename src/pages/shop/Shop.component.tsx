import React from 'react';
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from 'ajas-product-card';
import './Shop.component.styles.scss';
import { useProduct } from '../../data/hooks/useProduct';

const ShopPage = () => {

  const {products, onHandleChange} = useProduct();

  return (
    <div className="shop">
      <div className="product__item">
      {
        products.length && products.map(product => (
          <ProductCard
            product={product}
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

export default ShopPage;
