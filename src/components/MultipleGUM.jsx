import React, { useEffect } from 'react'

let localStream;

export default function MultipleGUM() {
  useEffect(() => {
    // navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    //   // const video = document.getElementById('videoLocal')
    //   // video.srcObject = stream
    //   // video.play()
    //   localStream = stream
    // })
    initSupportType()
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

  const initSupportType = () => {
    var types = ["video/webm",
    "audio/webm",
    "video/webm\;codecs=vp8",
    "video/webm\;codecs=daala",
    "video/webm\;codecs=h264",
    "audio/webm\;codecs=opus",
    "video/mpeg"];
    for (var i in types) {
      console.log( "Is " + types[i] + " supported? " + (MediaRecorder.isTypeSupported(types[i]) ? "Maybe!" : "Nope :("));
    }
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
