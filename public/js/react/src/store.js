import { createStore, applyMiddleware, compose } from 'redux'
import createDebounce from 'redux-debounced'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import api from './actions/utils/api'
import rootReducer from './reducers'
import preloadedState from './preloadedState'

export default function configureStore () {
  const store = createStore(rootReducer, preloadedState, compose(
    applyMiddleware(...middleware()),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  ))

  if (module.hot) {
    // enable hmr for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

function middleware () {
  const middleware = [ thunk, createDebounce(), api ]
  if (process.env.NODE_ENV === 'development') {
    // support disabling the logger (@Rowno hates it)
    if (window.localStorage.reduxlogger !== 'false') {
      middleware.push(logger({ collapsed: true }))
    }
  }
  return middleware
}
