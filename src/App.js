import React from 'react'
import Routes from './routes'

import './global.css'
import { Provider } from 'react-redux'
import configStore from './store/store'

const App = props => (
  <Provider store={ configStore() } >
    <Routes />
  </Provider>
)
  

export default App;
