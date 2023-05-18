import { APP_URL } from './dataMock';
import store from './store'
import { Navigate, useNavigate } from 'react-router-dom'


function App() {

  const isAuth = store.getState().mesUserStore.user.isAuthed
  const navigate = useNavigate();

  function btnLunch(_event: React.MouseEventHandler<HTMLButtonElement>) {
    navigate({
      pathname: String().concat(APP_URL.APP_URL_ROOT,"/",APP_URL.APP_WORKTIME_RECORD)
    }, { replace: true }) 
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
