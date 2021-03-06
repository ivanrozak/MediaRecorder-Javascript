import React, { useState, useEffect, useRef } from 'react'

let canvasStream, localStream, mediaRecorder, DRAWER

export default function MediaRecorder() {
  const [recordedBlobs, setRecordedBlobs] = useState([])
  const [displaySpeed, setDisplaySpeed] = useState("")
  const [supportType, setSupportType] = useState("")

  const videoRef = useRef(null)

  useEffect(() => {
    getUserMedia()
    let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      console.log(connection)
      setDisplaySpeed(connection.effectiveType)
      // if (connection.effectiveType === 'slow-2g') {
      //   alert('You are on a slow network. Please try again later.')
      // }
    }
  }, [])

  useEffect(() => {
    console.log(recordedBlobs, 'recordedBlobs')
  }, [recordedBlobs])

  function getUserMedia() {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    .then(stream => {
      const video = videoRef.current
      video.srcObject = stream
      localStream = stream
      video.play()
    })
    .catch(err => {
      console.log(err)
    })
  }

  

  function drawToCanvas() {
    let canvas, ctx

    console.log('Start Recording...')
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    ctx.canvas.width = 600
    ctx.canvas.height = 800
    canvasStream = canvas.captureStream()

    const ac = new AudioContext()
    const localAudio = ac.createMediaStreamSource(localStream)
    const destination = ac.createMediaStreamDestination()

    localAudio.connect(destination)

    canvasStream.addTrack(destination.stream.getAudioTracks()[0])

    DRAWER = setInterval(() => {
      ctx.drawImage(videoRef.current, 600 - 250 - 20, 20, 250, 187.5)
    }, 1000 / 33)

    const fileType = getSupportedMimetypes()[0]
    setSupportType(fileType)

    mediaRecorder = new MediaRecorder(canvasStream, {
      mimeType: fileType
    })

    function getSupportedMimetypes() {
      const possibleTypes = ["video/webm;codecs=vp9", "video/mp4"]
      return possibleTypes.filter((mimeType) => {
        return MediaRecorder.isTypeSupported(mimeType)
      })
    }

    mediaRecorder.ondataavailable = (e) => {
      console.log('ada datanya', e)
      let identity = 1
      identity = identity + 1
      const filename = "video-" + identity + ".mp4"
      // const filename = fileType === "video/webm;codecs=vp9" ? "video-" + Date.now() + ".webm" : "video-" + Date.now() + ".mp4"
      const file = new File([e.data], filename, {
        // mimeType: fileType
        mimeType: "video/mp4"
      })

      setRecordedBlobs((prevState) => [...prevState, file])
    }
    mediaRecorder.onstop = (e) => {
      clearInterval(DRAWER)
      console.log("stop recording", e, recordedBlobs)
    }
    mediaRecorder.start(5000)
  }

  function stopRecording() {
    mediaRecorder.stop()
  }

  function playVideo() {
    const videoRecorder = document.getElementById("videoRecorder")
    videoRecorder.src = null
    videoRecorder.srcObject = null
    const superBuffer = new Blob(recordedBlobs, { type: '.mp4' })
    videoRecorder.src = window.URL.createObjectURL(superBuffer)
    videoRecorder.controls = true
    videoRecorder.play()
  }

  return (
    <>
      <div id="app">
      <h1>media Recorder</h1>
      <div className="flex">
        <div className="local-container">
          <p>Local Video</p>
          {/* <video id="videoLocal" muted="muted" width="300" height="200" /> */}
          <video ref={videoRef} muted="muted" width="300" height="200" />
          <div>
            <button onClick={() => drawToCanvas()}>Record</button>
            <button onClick={() => stopRecording()}>Stop Record</button>
            <button onClick={() => playVideo()}>Play Video</button>
          </div>
        </div>
        {/* <div className="remote-container">
          <p>Recorder Video</p>
          <video id="videoRecorder" width="600" height="800" playsInline />
        </div> */}
        <div>Support Type: { supportType }</div>
      </div>
      <div>{displaySpeed}</div>
    </div>
    </>
  )
}
