'use client'
import React from 'react'
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Rectangle } from 'recharts'

interface ChartCompProps {
  data?: any
}

const ChartComp = ({ data }: ChartCompProps) => {
  if (!data) {
    return <p>Chart is loading...</p>
  } else {
    return (
      <div style={{ width: '10vw', height: '70vh' }}>
        <BarChart
          width={1300}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="userRegistrations"
            fill="#6e6b6c"
            activeBar={<Rectangle fill="darkgrey" stroke="black" />}
          />
          <Bar
            dataKey="keywordSearches"
            fill="lightgrey"
            activeBar={<Rectangle fill="lightgrey" stroke="black" />}
          />
          <Bar dataKey="likes" fill="black" activeBar={<Rectangle fill="black" stroke="black" />} />
        </BarChart>
      </div>
    )
  }
}

export default ChartComp
