import React, { useEffect } from 'react'

let localStream;

export default function MultipleGUM() {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      // const video = document.getElementById('videoLocal')
      // video.srcObject = stream
      // video.play()
      localStream = stream
    })
  }, [])

  const setGUM1 = () => {
    const video = document.getElementById('videoLocal')
    video.srcObject = localStream
    video.play()
  }
  const setGUM2 = () => {
    const video2 = document.getElementById('videoLocal2')
    video2.srcObject = localStream
    video2.play()
  }

  return (
    <>
      <div>MultipleGUM</div>
      <video id='videoLocal' autoPlay muted />
      <button onClick={setGUM1}>Set Video Local1</button>
      <video id='videoLocal2' autoPlay muted />
      <button onClick={setGUM2}>Set Video Local 2</button>
    </>
  )
}
