import React, { Component } from 'react'

import { Chart } from 'react-d3-core'

class ChartComponent extends Component {
  render () {
    const { props } = this
    const {
      title = 'User sample',
      width = 700,
      height = 300,
      margins = {left: 100, right: 100, top: 50, bottom: 50},
      children = [{field: 'BMI',name: 'BMI',color: '#ff7f0e'}]
    } = props
    return (
      <Chart
        title={title}
        width={width}
        height={height}
        margins= {margins} >
        {children}
      </Chart>
    )
  }
}

export default ChartComponent
