import React from 'react'
import '../styles/admin.module.css'

const GifTable = () => {
  return (
    <div style={{ width: '98vw', height: '100vh', padding: '20px' }}>
      <h2 style={{ padding: '10px 0px ' }}>Admin Pannel </h2>
      <hr />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '50px',
        }}
      >
        <div
          style={{
            width: '48%',
            height: 'fit-content',
            padding: '45px 20px',
            border: '2px solid black',
            borderRadius: '10px',
            marginTop: '20px',
          }}
        >
          <h4
            style={{ borderBottom: '2px red', paddingBottom: '20px', borderBottomStyle: 'ridge' }}
          >
            Top GIF by Like
          </h4>
          <div style={{ padding: '5px', marginTop: '20px' }}>
            <tr style={{ paddingTop: '30px' }}>
              <th style={{ padding: '5px 60px' }}>GIF Name</th>
              <th style={{ padding: '5px 60px' }}>GIF ID</th>
              <th style={{ padding: '5px 60px' }}>LIKES</th>
            </tr>
            <tr style={{ width: '100%' }}>
              <td style={{ padding: '5px 60px' }}>John</td>
              <td style={{ padding: '5px 60px' }}>John</td>
              <td style={{ padding: '5px 60px' }}>John</td>
            </tr>
          </div>
        </div>

        <div
          style={{
            width: '48%',
            height: 'fit-content',
            padding: '45px 20px',
            border: '2px solid black',
            borderRadius: '10px',
            marginTop: '20px',
          }}
        >
          <h4
            style={{ borderBottom: '2px red', paddingBottom: '20px', borderBottomStyle: 'ridge' }}
          >
            Top GIF by Like
          </h4>
          <div style={{ padding: '5px', marginTop: '20px' }}>
            <tr style={{ paddingTop: '30px' }}>
              <th style={{ padding: '5px 60px' }}>GIF Name</th>
              <th style={{ padding: '5px 60px' }}>GIF ID</th>
              <th style={{ padding: '5px 60px' }}>LIKES</th>
            </tr>
            <tr style={{ width: '100%' }}>
              <td style={{ padding: '5px 60px' }}>John</td>
              <td style={{ padding: '5px 60px' }}>John</td>
              <td style={{ padding: '5px 60px' }}>John</td>
            </tr>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GifTable
