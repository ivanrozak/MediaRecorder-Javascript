import React, {useState, useEffect} from 'react'

export default function UserAgent() {
  const [userAgent, setUserAgent] = useState('')
  useEffect(() => {
    setUserAgent(navigator.userAgent)
  }, [])
  return (
    <>
      <div>UserAgent</div>
      <div>{ userAgent }</div>
    </>
  )
}
