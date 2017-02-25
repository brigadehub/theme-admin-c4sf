import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeComponent from '../components/home'
import { getCheckinsCount } from '../selectors'

class HomeApp extends Component {
  render () {
    return React.createElement(HomeComponent, this.props)
  }

  componentDidMount () {
    const data = {}
    window.analytics.page('Home', data)
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeApp)
