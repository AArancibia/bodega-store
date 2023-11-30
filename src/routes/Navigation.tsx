import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { AreaChartOutlined, ShoppingOutlined, HomeOutlined, EditOutlined } from '@ant-design/icons';
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
import {User} from "../interfaces/user/User";
import ProductList from '../pages/products/list-products/ProductList.component';
import UserInformation from '../components/user/user-information/user-information.component';
import Chatbot from '../components/chatbot/chatbot.component';
import LotteryPage from '../pages/lottery/Lottery.component';
import {getCategories} from '../data/rest/product.service';
import {Category} from '../interfaces/Category';
import {setCategories} from '../redux/product/product.actions';

let items: MenuProps['items'] = [
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
].map((item, index) => ({
  key: item.url,
  icon: React.createElement(item.icon),
  label: <NavLink to={`${item.url}`}>{item.description}</NavLink>,
}));

interface Props {
  user: User;
  loadCategories: (categories: Array<Category>) => void;
}

const ICONS = {
  HomeOutlined: HomeOutlined,
  ShoppingOutlined: ShoppingOutlined,
  AreaChartOutlined: AreaChartOutlined,
  EditOutlined: EditOutlined,
}

const Navigation = ({user, loadCategories}: Props) => {
  const {pathname} = useLocation();
  const [current, setCurrent] = useState(pathname);
  const [menuItems, setMenuItems] = useState<any>(items);
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  useEffect(() => {
    getCategories()
      .then(categories => {
        loadCategories(categories);
      });
  }, []);

  useEffect(() => {
    if (user && user.profiles && user.profiles.length) {
      // @ts-ignore
      items = user.profiles.map(x => ({url: x.url, icon: ICONS[x.icon], description: x.description})).map((item, index) => ({
        key: item.url,
        icon: React.createElement(item.icon),
        label: <NavLink to={`${item.url}`}>{item.description}</NavLink>,
      }));
      setMenuItems(items);
    }
  }, [user])

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
        <Chatbot/>
        <Footer style={{ textAlign: 'center' }}>Copyright ©2022 Created by Bodega</Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  loadCategories: (categories: Array<Category>) => dispatch(setCategories(categories)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
