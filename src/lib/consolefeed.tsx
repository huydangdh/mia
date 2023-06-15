import React, { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'
import { Button } from 'react-bootstrap'

const LogsContainer = () => {
  const [logs, setLogs] = useState<any>([])
  
  function BtnClearOnClick() {
    setLogs([])
  }

  // run once!
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    )
    return () => Unhook(hookedConsole)
  }, [])

  return <><Button variant='danger' onClick={BtnClearOnClick}>X</Button><Console logs={logs} variant="dark" styles={{LOG_BACKGROUND: "black"}}/></>
}

export { LogsContainer }
