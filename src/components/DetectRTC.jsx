import React, { useEffect, useState } from 'react'
import DetectRTC from 'detectrtc'

export default function RTCdetect() {
  const [rtcDetail, setRTC] = useState({})

  function getRTCDetails() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      console.log('masuk getUserMedia')
      DetectRTC.load(() => {
        setRTC(DetectRTC)
        console.log('debug', DetectRTC)
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getRTCDetails()
  }, [])
  return (
    <>
      <div>DetectRTC</div>
      <div>{ JSON.stringify(rtcDetail) }</div>
      {/* <div>{ rtcDetail }</div> */}
    </>
  )
}
