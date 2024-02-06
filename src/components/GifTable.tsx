import React from 'react'

const GifTable = ({ likesList }: any) => {
  return (
    <div
      style={{
        width: '100%',
        padding: '50px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 4px 100px 0px #cccccc',
        border: '2px solid #cccccc',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 'fit-content',
        }}
      >
        <h4
          style={{
            marginBottom: '30px',
            backgroundColor: '#d9fae2',
            border: '2px solid',
            borderColor: 'grey',
            padding: '20px',
            borderRadius: '20px',
          }}
        >
          TOP GIF BY LIKES 🩷🩷🩷
        </h4>

        <table
          style={{
            width: '100%',
            height: '200px',
            borderCollapse: 'collapse',
          }}
        >
          <thead style={{ backgroundColor: 'black', color: 'white' }}>
            <tr>
              <th
                style={{
                  borderBottom: '1px solid black',
                  border: '2px solid black',
                  padding: '6px 8px',
                }}
              >
                GIF Name
              </th>
              <th
                style={{
                  borderBottom: '1px solid black',
                  border: '2px solid black',
                  padding: '6px 8px',
                }}
              >
                GIF ID
              </th>
              <th
                style={{
                  borderBottom: '1px solid black',
                  border: '2px solid black',
                  padding: '6px 8px',
                }}
              >
                GIF Likes
              </th>
            </tr>
          </thead>
          <tbody>
            {likesList.map((gif: any) => {
              return (
                <tr key={gif._id}>
                  <td style={{ textAlign: 'center', border: '2px solid black' }}>Akram</td>
                  <td style={{ textAlign: 'center', border: '2px solid black' }}>{gif.gifId}</td>
                  <td style={{ textAlign: 'center', border: '2px solid black' }}>
                    {gif.likeBy.length}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GifTable
