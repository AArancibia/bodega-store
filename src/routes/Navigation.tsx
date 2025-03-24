import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import HeaderComponent from '../components/header/Header.component';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import {useProfile} from '../data/hooks/useProfile';
import type {ItemType} from 'antd/lib/menu/hooks/useItems';
import {LogoutOutlined} from '@ant-design/icons';
import {selectCurrentUser} from '../redux/user/user.selector';
import {useSelector} from 'react-redux';

const Navigation = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
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

  const onLogoutClick = () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
        className="sidebar"
      >
        <Menu
          theme="dark"
          onClick={onClick}
          mode="inline"
          selectedKeys={[current]}
          items={menuItems}
        />
        <div className="sidebar__logout">
          {
            user ? <Menu
                  style={{backgroundColor: '#04325f', color: 'white', width: '100%', 'borderRight': 'none'}}
                  mode="inline"
                  items={[{label: 'Logout', key: 'logout', dashed: true, icon: <LogoutOutlined />, onClick: onLogoutClick} as ItemType]}
              /> : null
          }
        </div>
      </Sider>
      <Layout>
        <HeaderComponent />
        <Content style={{ margin: '5px 0px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright ©2025 Created by Arancibia Alexis</Footer>
      </Layout>
    </Layout>
  );
};

export default Navigation;
