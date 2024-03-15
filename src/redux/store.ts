import {applyMiddleware, createStore, Middleware} from 'redux';
import { persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const { logger } = require(`redux-logger`);


const sagaMiddleware = createSagaMiddleware();

const middlewares: Array<Middleware<any, any, any>> = [
  logger,
  sagaMiddleware,
];

middlewares.push(sagaMiddleware);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
