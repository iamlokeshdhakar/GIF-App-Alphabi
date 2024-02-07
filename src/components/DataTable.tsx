import React from 'react'

interface IDataTable {
  likesList?: any
  dailyStatsData?: any
  mostActiveUsers?: any
  tableHeadText: string[]
}

const DataTable = ({ likesList, tableHeadText, dailyStatsData, mostActiveUsers }: IDataTable) => {
  return (
    <table
      style={{
        width: '100%',
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
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '12px 0px' }}>
                  {gif.gifName}
                </td>
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '12px 0px' }}>
                  {gif.gifId}
                </td>
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '12px 0px' }}>
                  {gif.likeCount}
                </td>
              </tr>
            )
          })}
        </tbody>
      )}

      {mostActiveUsers?.length > 0 && (
        <tbody>
          {mostActiveUsers.map((user: any) => {
            return (
              <tr key={user._id}>
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '12px 0px' }}>
                  {user.fullname}
                </td>
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '12px 0px' }}>
                  {user.searchCount}
                </td>
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '12px 0px' }}>
                  {user.likeCount}
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
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '15px 0px' }}>
                  {item.date}
                </td>
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '15px 0px' }}>
                  {item.likes}
                </td>
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '15px 0px' }}>
                  {item.userRegistrations}
                </td>
                <td style={{ textAlign: 'center', border: '2px solid black', padding: '15px 0px' }}>
                  {item.keywordSearches}
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
