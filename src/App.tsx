import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2> [MAIN_APP ] </h2>
      <Link to='Login'>Login</Link>
      | 
      <Link to='SignUp'>SignUp</Link>
      |
      <Link to='AccountInfo'>AccountInfo</Link>
      |
      <Link to='Null'>Null</Link>
      |
      <Link to='Null'>Null</Link>
    </>
  )
}

export default App
