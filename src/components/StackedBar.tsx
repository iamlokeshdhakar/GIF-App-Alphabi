import React, { PureComponent } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface IStackedBar {
  mostActiveUsers?: any
}

const StackedBar = ({ mostActiveUsers }: IStackedBar) => {
  if (!mostActiveUsers) return <p>Stacked bar is loading...</p>
  else {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={mostActiveUsers}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fullname" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="searchCount" barSize={100} stackId="a" fill="#363434" />
            <Bar dataKey="likeCount" stackId="a" fill="#a8a7a7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default StackedBar
