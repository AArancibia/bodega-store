import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { AreaChartOutlined, ShoppingOutlined, HomeOutlined } from '@ant-design/icons';
import ShopPage from '../pages/shop/Shop.component';
import HeaderComponent from '../components/header/Header.component';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import CheckOutPage from '../pages/checkout/CheckOut.component';
import ReportPage from '../pages/report/Report.component';

const items: MenuProps['items'] = [
  {
    description: 'Listado de productos',
    icon: HomeOutlined,
    url: '/'
  },
  {
    description: 'Carrito de compras',
    icon: ShoppingOutlined,
    url: '/carrito'
  },
  {
    description: 'Reporte de ventas',
    icon: AreaChartOutlined,
    url: '/reporte'
  }
].map((item, index) => ({
  key: item.url,
  icon: React.createElement(item.icon),
  label: <NavLink to={`${item.url}`}>{item.description}</NavLink>,
}));


const Navigation = () => {
  const {pathname} = useLocation();
  const [current, setCurrent] = useState(pathname);
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu
          theme="dark"
          onClick={onClick}
          mode="inline"
          selectedKeys={[current]}
          items={items}
        />
      </Sider>
      <Layout>
        <HeaderComponent />
        <Content style={{ margin: '5px 0px' }}>
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/carrito" element={<CheckOutPage />} />
            <Route path="/reporte" element={<ReportPage />} />
            <Route path="/*" element={<div>Not found</div>} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright ©2022 Created by Bodega</Footer>
      </Layout>
    </Layout>
  );
};

export default Navigation;
