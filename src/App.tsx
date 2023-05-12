import { useState } from 'react'
import store from './store'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'




function App() {
  const [count, setCount] = useState(0)

  const isAuth = store.getState().user.user.isAuthed
  const navigate = useNavigate();

  function btnLunch(event: React.MouseEventHandler<HTMLButtonElement>) {
    navigate({pathname: "/app/worktime_record"},{replace:true}) 
  }

  if (!isAuth) {
    return <Navigate replace to={"/Login"} />

  } else {
    return (
      <>
        <div className='w3-container w3-blue'>
          <h2>[[App_Name]]</h2>
        </div>
        <div className="w3-container">
          <p>A car is a wheeled, self-powered motor vehicle used for transportation. Most definitions of the term specify that cars are designed to run primarily on roads. (Wikipedia)</p>
          <button className='w3-btn w3-green' type='button' onClick={btnLunch}>[[Button_Name]]</button>
        </div>
      </>
    )
  }
}

export default App
