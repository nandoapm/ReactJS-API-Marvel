import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './models/rootReducer'

export default function configStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  )
}