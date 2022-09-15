import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { AreaChartOutlined, ShoppingOutlined, HomeOutlined } from '@ant-design/icons';
import ShopPage from '../pages/shop/Shop.component';
import HeaderComponent from '../components/header/Header.component';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import CheckOutPage from '../pages/checkout/CheckOut.component';

const items: MenuProps['items'] = [
  {
    description: 'Listado de productos',
    icon: HomeOutlined,
    url: ''
  },
  {
    description: 'Carrito de compras',
    icon: ShoppingOutlined,
    url: 'carrito'
  },
  {
    description: 'Reporte de ventas',
    icon: AreaChartOutlined,
    url: 'reporte'
  }
].map((item, index) => ({
  key: item.url,
  icon: React.createElement(item.icon),
  label: <NavLink to={`${item.url}`}>{item.description}</NavLink>,
}));


const Navigation = () => {
  return (
    <Router >

      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={['carrito']}
            items={items}
          />
        </Sider>
        <Layout>
          <HeaderComponent />
          <Content style={{ margin: '5px 0px' }}>
            <Routes>
              <Route path="/" element={<ShopPage />}>
                {/*<Route index element={<Home />} />
              <Route path="teams" element={<Teams />}>
                <Route path=":teamId" element={<Team />} />
              </Route>*/}
              </Route>
              <Route path="/carrito" element={<CheckOutPage />} />
              <Route path="/reporte" element={<ShopPage />} />
              <Route path="/*" element={<div>Not found</div>} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright ©2022 Created by Bodega</Footer>
        </Layout>
      </Layout>

      {/*<div className="main-layout">
        <nav>
          <img src={ logo } alt="React Logo" />
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
          </ul>
        </nav>
      </div>*/}
    </Router>
  );
};

export default Navigation;
