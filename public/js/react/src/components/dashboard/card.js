import React, { Component } from 'react'

class CardComponent extends Component {
  render () {
    const { props } = this
    const { title = false, children } = props
    return (
      <div className='card col-md-4'>
        {title && title.length && <h4 class="card-title">{title}</h4>}
        {children && React.Children.toArray(children)}
      </div>
    )
  }
}

export default CardComponent
