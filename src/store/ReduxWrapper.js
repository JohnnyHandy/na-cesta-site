import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Notifications from '../components/notifications'
import configureStore from './configureStore'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { verifyCredentialsRequest } from '../store/auth'

const { store, persistor } = configureStore();

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY)

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
          <Elements stripe={stripePromise}>
            <Notifications />
              {element}
          </Elements>
        </PersistGate>
    </Provider>
)};

export default ReduxWrapper