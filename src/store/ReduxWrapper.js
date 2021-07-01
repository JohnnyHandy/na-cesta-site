import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import Notifications from '../components/notifications'
import configureStore from './configureStore'

import { verifyCredentialsRequest } from '../store/auth'

const { store, persistor } = configureStore();

export const OnRouteChange = ({ location }) => {
    if(store.getState().auth.isLoggedIn) {
      store.dispatch(verifyCredentialsRequest())
    }
}

const ReduxWrapper =  ({ element }) => {
    return (
    <Provider store={store}>
        <PersistGate
            persistor={persistor}
        >
          <Notifications />
            {element}
        </PersistGate>
    </Provider>
)};

export default ReduxWrapper