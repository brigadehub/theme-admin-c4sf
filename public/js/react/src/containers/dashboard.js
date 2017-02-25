import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardComponent from '../components/dashboard'
import { getCheckinsCount } from '../selectors'

class DashboardApp extends Component {
  render () {
    return React.createElement(DashboardComponent, this.props)
  }

  componentDidMount () {
    const data = {}
    window.analytics.page('Dashboard', data)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    checkinCount: getCheckinsCount(state)
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    // onSubmit: data => dispatch(createSession(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardApp)
