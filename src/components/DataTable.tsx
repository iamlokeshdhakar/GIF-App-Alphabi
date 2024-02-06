import React from 'react'

interface IDataTable {
  likesList?: any
  dailyStatsData?: any
  tableHeadText: string[]
}

const DataTable = ({ likesList, tableHeadText, dailyStatsData }: IDataTable) => {
  return (
    <table
      style={{
        width: '100%',
        height: '200px',
        borderCollapse: 'collapse',
      }}
    >
      <thead style={{ backgroundColor: 'black', color: 'white' }}>
        <tr>
          <>
            {tableHeadText.map((headText: string, r: any) => {
              return (
                <th
                  key={r}
                  style={{
                    borderBottom: '1px solid black',
                    border: '2px solid black',
                    padding: '14px 8px',
                  }}
                >
                  {headText}
                </th>
              )
            })}
          </>
        </tr>
      </thead>
      {likesList?.length > 0 && (
        <tbody>
          {likesList.map((gif: any) => {
            return (
              <tr key={gif._id}>
                <td style={{ textAlign: 'center', border: '2px solid black' }}>{gif.gifName}</td>
                <td style={{ textAlign: 'center', border: '2px solid black' }}>{gif.gifId}</td>
                <td style={{ textAlign: 'center', border: '2px solid black' }}>
                  {gif.likeBy.length}
                </td>
              </tr>
            )
          })}
        </tbody>
      )}
      {dailyStatsData?.length > 0 && (
        <tbody>
          {dailyStatsData.map((item: any) => {
            return (
              <tr key={item._id}>
                <td style={{ textAlign: 'center', border: '2px solid black' }}>{item.date}</td>
                <td style={{ textAlign: 'center', border: '2px solid black' }}>{item.likes}</td>
                <td style={{ textAlign: 'center', border: '2px solid black' }}>
                  {item.keywordSearches}
                </td>
                <td style={{ textAlign: 'center', border: '2px solid black' }}>
                  {item.userRegistrations}
                </td>
              </tr>
            )
          })}
        </tbody>
      )}
    </table>
  )
}

export default DataTable
