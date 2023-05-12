import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Link, Route, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, IRootState, MesUserState, setUser } from './store.ts';
import LoginPage from './pages/Login.tsx';
import 'w3-css'
import WorkTimeRecord from './pages/app/worktime_record.tsx';

function Layout() {
  return (
    <>
      <h2>[HEADER_BAR]</h2>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
        path:"app",
        children: [{
            path: "worktime_record",
            element: <WorkTimeRecord />
          }]
      }]
  },
  {
    path: "Login",
    element: <><Layout /><h1><LoginPage /></h1></>,
  },
  {
    path: "SignUp",
    element: <><Layout /><h1>[LOGIN_PAGE]</h1></>,
  },
  {
    path: "about",
    element: <><Layout /><h1>[LOGIN_PAGE]</h1></>,
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="w3-bar w3-black">
          <Link to={"/"} className="w3-bar-item w3-button">Home</Link>
          <a href="#" className="w3-bar-item w3-button">Link 1</a>
          <a href="#" className="w3-bar-item w3-button">Link 2</a>
          <a href="#" className="w3-bar-item w3-button">Link 3</a>
        </div>
        <div className='w3-container'>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/app/worktime_record' element={<WorkTimeRecord />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)


