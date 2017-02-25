import React, { Component } from 'react'

class HomeComponent extends Component {
  render () {
    const { props } = this
    const { checkinCount = 4 } = props
    return (
      <div className='home'>
        <h3>HomeComponent</h3>
      </div>
    )
  }
}

export default HomeComponent
