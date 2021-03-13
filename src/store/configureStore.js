import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import ProductSagas from './products/sagas';
import { ProductsReducer } from './products/index';
import { CartReducer } from './cart/index'
import CartSagas from './cart/sagas'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();
export function* rootSaga() {
  yield all([
    ProductSagas(),
    CartSagas()
  ]);
}

const rootReducer = combineReducers({
  products: ProductsReducer,
  cart: CartReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const config = ({ initialState } = {}) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
    devTools: true,
    preloadedState: initialState,
  });
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};

export default config;