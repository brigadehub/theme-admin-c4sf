import React, { Component } from 'react'

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

class LineChartComponent extends Component {
  render () {
    const { props } = this
    const {
      height = 300,
      margins = {
        top: 5,
        right: 20,
        bottom: 5,
        left: 0 },
      data = []
    } = props
    return (
      <ResponsiveContainer
        width="100%"
        height={height}
        >
        <LineChart
          data={data}
          margin={margins}>
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#8884d8" />
          <CartesianGrid
            stroke="#ccc"
            strokeDasharray="5 5" />
          <XAxis
            dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export default LineChartComponent
