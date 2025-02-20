import React, {useEffect, useState} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import HeaderComponent from '../components/header/Header.component';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectCurrentUser} from "../redux/user/user.selector";
import {User} from "../domain/interfaces/user/User";
import {useProfile} from '../data/hooks/useProfile';
import type {ItemType} from 'antd/lib/menu/hooks/useItems';

interface Props {
  user: User;
}

const Navigation = (_: Props) => {
  const {pathname} = useLocation();
  const [current, setCurrent] = useState(pathname);
  const {profiles, buildMenuItems} = useProfile();
  let [menuItems, setMenuItems] = useState<ItemType[]>([]);
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };

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
          <Outlet />
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
