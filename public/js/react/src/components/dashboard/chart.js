import React, { Component } from 'react'

import {
  ResponsiveContainer
} from 'recharts';

import LineChart from './lineChart'

class ChartComponent extends Component {
  render () {
    const { props } = this
    const {
      type,
      height = 400
    } = props
    let Chart
    switch (type) {
      case 'line':
        Chart = (<LineChart {...props}>)
    }
    return (
      <ResponsiveContainer
        width="100%"
        height={height}
        >

      </ResponsiveContainer>
    )
  }
}

export default ChartComponent
