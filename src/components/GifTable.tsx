import React from 'react'

const GifTable = ({ likesList, tableHeadText }: any) => {
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
    </table>
  )
}

export default GifTable
