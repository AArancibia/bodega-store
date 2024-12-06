import React, {useEffect, useState} from 'react';
import {createBrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import ShopPage from '../pages/shop/Shop.component';
import HeaderComponent from '../components/header/Header.component';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import CheckOutPage from '../pages/checkout/CheckOut.component';
import ReportPage from '../pages/report/Report.component';
import CheckOutPayment from "../pages/checkout-payment/CheckOutPayment.component";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectCurrentUser} from "../redux/user/user.selector";
import {User} from "../domain/interfaces/user/User";
import ProductList from '../pages/products/list-products/ProductList.component';
import UserInformation from '../components/user/user-information/user-information.component';
import Chatbot from '../components/chatbot/chatbot.component';
import LotteryPage from '../pages/lottery/Lottery.component';
import {useProfile} from '../data/hooks/useProfile';
import type {ItemType} from 'antd/lib/menu/hooks/useItems';

import {} from '@reduxjs/toolkit';

interface Props {
  user: User;
}

const Navigation = ({user}: Props) => {
  const {pathname} = useLocation();
  const [current, setCurrent] = useState(pathname);
  const {profiles, buildMenuItems} = useProfile();
  let [menuItems, setMenuItems] = useState<ItemType[]>([]);
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  const routes = createBrowserRouter([
    {path: '/', element: <ShopPage />},
    {path: '/carrito', element: <CheckOutPage />},
    {path: '/carrito/pago', element: <CheckOutPayment />},
    {path: '/reporte', element: <ReportPage />},
    {path: '/productos', element: <ProductList />},
    {path: '/informacion', element: <UserInformation />},
    {path: '/sorteo', element: <LotteryPage />},
    {path: '/*', element: <div>Not Found</div>},
  ]);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  useEffect(() => {
    setMenuItems(buildMenuItems());
  }, [profiles]);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          onClick={onClick}
          mode="inline"
          selectedKeys={[current]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <HeaderComponent />
        <Content style={{ margin: '5px 0px' }}>
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/carrito" element={<CheckOutPage />}></Route>
            <Route path="/carrito/pago" element={<CheckOutPayment />}></Route>
            <Route path="/reporte" element={<ReportPage />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/informacion" element={<UserInformation />} />
            <Route path="/sorteo" element={<LotteryPage />} />
            <Route path="/*" element={<div>Not found</div>} />
          </Routes>
        </Content>
        {/*<Chatbot/>*/}
        <Footer style={{ textAlign: 'center' }}>Copyright ©2022 Created by Arancibia Alexis</Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(Navigation);
