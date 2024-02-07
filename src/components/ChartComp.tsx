'use client'
import React from 'react'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts'

interface ChartCompProps {
  data?: any
}

const ChartComp = ({ data }: ChartCompProps) => {
  if (!data) {
    return <p>Chart is loading...</p>
  } else {
    return (
      <div style={{ width: '100%', height: '70vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="likes" fill="#363434" stroke="#363434" />
            <Bar dataKey="userRegistrations" barSize={40} fill="#363434" />
            <Line type="monotone" dataKey="keywordSearches" stroke="#363434" />
            <Scatter dataKey="cnt" fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default ChartComp
