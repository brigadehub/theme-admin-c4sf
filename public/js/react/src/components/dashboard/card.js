import React, { Component } from 'react'

class CardComponent extends Component {
  render () {
    const { props } = this
    const { title = '', children = [] } = props
    return (
      <div className='card'>
        <h4 className="card-title">{title}</h4>
        <div className="card-text">{children}</div>
      </div>
    )
  }
}

export default CardComponent
