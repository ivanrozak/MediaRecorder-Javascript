import React from 'react'
import MediaRecorder from './components/MediaRecorder'
import MultipleGUM from './components/MultipleGUM'
// import DetectRTC from './components/DetectRTC'
// import DetectSpeed from './components/DetectSpeed'
// import UserAgent from './components/UserAgent'
import './App.css'

export default function App() {
  return (
    <>
      <div className='h-screen'>
        {/* <DetectRTC /> */}
        {/* <DetectSpeed /> */}
        {/* <MediaRecorder /> */}
        <MultipleGUM />
        {/* <UserAgent /> */}
      </div>
    </>
  )
}
