import React, { Component } from 'react'
import Card from './dashboard/card'
import Chart from './dashboard/chart'
import LineChart from './dashboard/linechart'

class DashboardComponent extends Component {
  render () {
    const { props } = this
    const { checkinCount = 4 } = props
    return (
      <div className='home'>
        <h3>DashboardComponent</h3>
        <Card>
          <Chart>
            <LineChart />
          </Chart>
        </Card>
      </div>
    )
  }
}

export default DashboardComponent
