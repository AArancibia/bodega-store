import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from "redux-persist/integration/react";
import router from './routes/Routes';
import {GoogleOAuthProvider} from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId="141628866238-r50i8v0com33f5m3u6if5lan8b184tl1.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate persistor={persistor} >
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
