import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form'
import { persistStore, persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { reducer as notifications } from 'react-notification-system-redux';

import ProductSagas from './products/sagas';
import { ProductsReducer } from './products/index';
import { CartReducer } from './cart/index'
import CartSagas from './cart/sagas'
import { AuthReducer } from './auth';
import AuthSaga from './auth/sagas';

import { addTokenToRequest } from './middlewares'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();
export function* rootSaga() {
  yield all([
    ProductSagas(),
    CartSagas(),
    AuthSaga(),
  ]);
}

const rootReducer = combineReducers({

  auth: AuthReducer,
  products: ProductsReducer,
  cart: CartReducer,
  form: formReducer,
  notifications
  
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const config = ({ initialState } = {}) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware, addTokenToRequest],
    devTools: true,
    preloadedState: initialState,
  });
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};

export default config;