import React from 'react'
import { Provider } from 'react-redux'
import { navigate } from 'gatsby'
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './configureStore'

import { verifyCredentialsRequest } from '../store/auth'

const { store, persistor } = configureStore();

export const OnRouteChange = ({ location, ...rest}) => {
    if(store.getState().auth.isLogged) {
        navigate('/')
    }
    store.dispatch(verifyCredentialsRequest())
}

export default ({ element, ...rest }) => {
    return (
    <Provider store={store}>
        <PersistGate
            persistor={persistor}
        >
            {element}
        </PersistGate>
    </Provider>
)};