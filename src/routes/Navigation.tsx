import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from '../logo.svg';
import ShopPage from '../pages/shop/Shop.component';
import Header from '../components/header/Header.component';

const Navigation = () => {
  return (
    <Router >
      <div className="main-layout">
        <nav>
          {/*<img src={ logo } alt="React Logo" />*/}
          <ul>
            <li>
              {/*<NavLink to="/">Home</NavLink>*/}
            </li>
            <li>
              {/*<NavLink to="/about">About</NavLink>*/}
            </li>
            <li>
              {/*<NavLink to="/users">Users</NavLink>*/}
            </li>
          </ul>
        </nav>
        <div className="w-100">
          <Header />
          <Routes>
            <Route path="/" element={<ShopPage />}>
              {/*<Route index element={<Home />} />
              <Route path="teams" element={<Teams />}>
                <Route path=":teamId" element={<Team />} />
              </Route>*/}
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Navigation;
