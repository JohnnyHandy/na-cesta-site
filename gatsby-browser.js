

import { OnRouteChange } from './src/store/ReduxWrapper' 
export { default as wrapRootElement } from './src/store/ReduxWrapper'


export const onRouteUpdate = (props) => {
  OnRouteChange(props)
}