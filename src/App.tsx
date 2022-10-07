import React from 'react';
import './App.scss';
import Navigation from './routes/Navigation';
import { Route, Routes } from 'react-router-dom';
import SignInSignOutPage from './pages/sign-in-sign-out/SignInSignOut.component';
import Spinner from "./components/spinner/Spinner.component";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectLoader} from "./redux/loader/loader.selector";

interface Props {
    loader: boolean;
}

const App = ({loader}: Props) => {
  return (
      <>
          <Routes>
              <Route path="/login" element={<SignInSignOutPage />} />
              <Route path="*" element={<Navigation />}></Route>
          </Routes>
          {
              loader && (
                  <div className="spinner">
                      <Spinner size={"large"}/>
                  </div>
              )
          }
      </>
  );
}

const mapStateToProps = createStructuredSelector({
    loader: selectLoader
})

export default connect(mapStateToProps)(App);
