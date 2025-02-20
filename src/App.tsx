import React from 'react';
import './App.scss';
import {Outlet} from 'react-router-dom';
import Spinner from "./components/spinner/Spinner.component";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectLoader} from "./redux/loader/loader.selector";
import ModalLotteryNotificationComponent
  from './components/modal-lottery-notification/modal-lottery-notification.component';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {queryClient} from './data/rest/query-client.config';

interface Props {
    loader: boolean;
}

const App = ({loader}: Props) => {

  return (
      <>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        <Outlet />
          {
              loader && (
                  <div className="spinner">
                      <Spinner size={"large"}/>
                  </div>
              )
          }
        <ModalLotteryNotificationComponent />
        </QueryClientProvider>
      </>
  );
}

const mapStateToProps = createStructuredSelector({
    loader: selectLoader
})

export default connect(mapStateToProps)(App);
