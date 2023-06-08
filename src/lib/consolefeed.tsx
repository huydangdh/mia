import React, { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'

const LogsContainer = () => {
  const [logs, setLogs] = useState<any>([])

  // run once!
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    )
    return () => Unhook(hookedConsole)
  }, [])

  return <Console logs={logs} variant="dark"/>
}

export { LogsContainer }
