import React from 'react';
import './Shop.component.styles.scss';
import DirectoryComponent from '../../components/directory/Directory.component';

const ShopPage = () => {

  return (
    <div className="shop">
      <div className="product__item">
        <DirectoryComponent></DirectoryComponent>
      </div>
    </div>
  );
};

export default ShopPage;
