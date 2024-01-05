import { ProductButtons, ProductCard, ProductImage, ProductTitle } from 'ajas-product-card';
import { Product } from '../../interfaces/Product';
import { CartItem } from '../../interfaces/CartItem';
import { useProduct } from '../../data/hooks/useProduct';
import {setCategories, setProducts} from '../../redux/product/product.actions';
import { addCartItem, removeCartItem } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selector';
import './Directory.component.scss';
import {Category} from '../../interfaces/Category';

interface Props {
  cartItems: Array<CartItem>
  addCartItem: (cartItems: CartItem) => void;
  removeCartItem: (id: string) => void;
  loadCategories: (categories: Array<Category>) => void;
}

const DirectoryComponent = ({cartItems, addCartItem, removeCartItem, loadCategories}: Props) => {
  const {products, onHandleChange} = useProduct({addCartItem, removeCartItem});
  setProducts(products);
  return (
    <>
      {
        !!products.length && products.map(product => {
          const value = cartItems.find(x => x.product.id === product.id)?.count ?? 0;
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
  loadCategories: (categories: Array<Category>) => dispatch(setCategories(categories)),
  addCartItem: (cartItem: CartItem) => dispatch(addCartItem(cartItem)),
  removeCartItem: (id: string) => dispatch(removeCartItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryComponent);
