import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store'
import Wrapper from './components/Wrapper'
import HomeContainer from './containers/home'
import DashboardContainer from './containers/dashboard'

window.analytics = {page:()=>null}


const store = configureStore()

const app = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/admin" component={HomeContainer} />
      <Route path="/admin/dashboard" component={DashboardContainer} />
      {/* <Route path="/admin/projects" component={HomeContainer} />
      <Route path="/admin/users" component={HomeContainer} />
      <Route path="/admin/blog" component={HomeContainer} />
      <Route path="/admin/events" component={HomeContainer} />
      <Route path="/admin/brigade-settings" component={HomeContainer} /> */}
    </Router>
  </Provider>
)

render(app, document.querySelector('#app'))


// {/* <Route path="/hero/:name" component={Hero} /> */}
