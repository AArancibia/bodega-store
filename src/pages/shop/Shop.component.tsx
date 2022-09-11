import React, { useEffect, useState } from 'react';
import { getProducts } from '../../data/product.service';
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from 'ajas-product-card';
import './Shop.component.styles.scss';
import { onChangeArgs } from 'ajas-product-card/src/interfaces/interfaces';

const ShopPage = () => {
  const [products, setProducts] = useState<Array<any>>([]);
  useEffect(() => {
    getProducts()
      .then((products) => setProducts(products))
      .catch()
  }, []);

  const onHandleChange = (changeArgs: onChangeArgs) => {
    console.log(changeArgs);
  }

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
               height: '320px',
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
