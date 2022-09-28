import { applyMiddleware, createStore } from 'redux';
import { persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const middlewares = [logger];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
