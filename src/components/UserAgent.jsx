import React, {useState, useEffect} from 'react'

export default function UserAgent() {
  const [userAgent, setUserAgent] = useState('')
  const [connectionSupport, setConnectionSupport] = useState('')

  const ua = navigator.userAgent

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  useEffect(() => {
    // setUserAgent(navigator.userAgent)
    if ((/(i[PSa-z\s]+);.*?CPU\s([OSPa-z\s]+(?:([\d_]+)|;))/g.test(ua)) || (/version\/([\w\.]+) .*(mobile ?safari|safari)/i.test(ua)) || (/version\/([\w\.]+) .*mobile\/\w+ (safari)/i.test(ua))) {
      setUserAgent('is Safari or Ipad')
    } else {
      setUserAgent('is not Safari or Ipad')
    }

    if (connection) {
      console.log(connection.downlink)
      // if (connection.effectiveType === 'slow-2g') {
      //   preloadVideo = false;
      // }
      setConnectionSupport(connection.effectiveType + ' ' + connection.downlink)
    } else {
      console.log('connection doesn\'t support')
      setConnectionSupport('connection doesn\'t support')
    }

  }, [])

  useEffect(() => {
    if (navigator.onLine) {
      console.log('online')
    } else {
      console.log('offline')
    }
  }, [])

  return (
    <>
      <div>UserAgent</div>
      <div>{ userAgent }</div>
      <div>{ connectionSupport }</div>
    </>
  )
}
