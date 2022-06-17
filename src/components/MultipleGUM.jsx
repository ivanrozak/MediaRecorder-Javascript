import React, { useEffect, useState } from 'react'

let localStream;

export default function MultipleGUM() {
  const [supportedType, setSupportedType] = useState('')
  useEffect(() => {
    // navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    //   // const video = document.getElementById('videoLocal')
    //   // video.srcObject = stream
    //   // video.play()
    //   localStream = stream
    // })
    // initSupportType()
    console.log(getSupportedMimetypes()[0])
    setSupportedType(getSupportedMimetypes()[0])
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
    types.filter((mimeType) => {
      console.log(MediaRecorder.isTypeSupported(mimeType))
    })
  }

  function getSupportedMimetypes () {
    const possibleTypes = ['video/webm;codecs=vp9', 'video/mp4']
    return possibleTypes.filter((mimeType) => {
      return MediaRecorder.isTypeSupported(mimeType)
    })
  }

  return (
    <>
      <div>MultipleGUM</div>
      {/* <video id='videoLocal' autoPlay muted />
      <button onClick={setGUM1}>Set Video Local1</button>
      <video id='videoLocal2' autoPlay muted />
      <button onClick={setGUM2}>Set Video Local 2</button> */}
      <div>{supportedType}</div>
    </>
  )
}
