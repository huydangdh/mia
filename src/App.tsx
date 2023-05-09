import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import store from './store'
import { Link, Navigate, redirect } from 'react-router-dom'




function App() {
  const [count, setCount] = useState(0)

  const isAuth = store.getState().user.user.isAuthed

  if (!isAuth) {
    return <Navigate replace to={"/Login"} />

  } else {
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
}

export default App
