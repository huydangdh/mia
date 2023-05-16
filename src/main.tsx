import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, {} from './store.ts';
import LoginPage from './pages/Login.tsx';
import 'w3-css'
import WorkTimeRecord from './pages/app/worktime_record.tsx';
import { APP_URL } from './dataMock.ts';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


const router = createBrowserRouter([
  {
    path: APP_URL.ROOT,
    element: <App />,
  },
  {
    path: APP_URL.APP_URL_ROOT,
    children: [{
      path: APP_URL.APP_WORKTIME_RECORD,
      element: <WorkTimeRecord />
    }]
  },
  {
    path: "Login",
    element: <><LoginPage /></>,
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="w3-bar w3-black">
        <a href="/" className="w3-bar-item w3-button">Home</a>
        <a href="#" className="w3-bar-item w3-button">Link 1</a>
        <a href="#" className="w3-bar-item w3-button">Link 2</a>
        <a href="#" className="w3-bar-item w3-button">Link 3</a>
      </div>
      <div className='w3-container'>
        <RouterProvider router={router} />
      </div>
    </Provider>
  </React.StrictMode>,
)


