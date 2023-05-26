import React, { createContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch, MesUser, resetUser, setUser, useMesSelector } from "./store.ts";
import LoginPage from "./pages/Login.tsx";
{/* The following line can be included in your src/index.js or App.js file */}
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css'

import WorkTimeRecord from "./pages/app/worktime_record.tsx";
import { APP_URL } from "./dataMock.ts";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { GetCurrentUser } from "./util/mock.ts";
import NavBar from "./NavBar.tsx";

export const MyContext = createContext<MesUser | undefined | any>(undefined);

function MyRouter() {
  const isAuth = useMesSelector((s) => s.mesUserState.user.isAuthed)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    let _mesUser = undefined
    if (!isLoading) return undefined
    GetCurrentUser().then((value) => {
      _mesUser = value
      console.log(JSON.stringify(_mesUser))
      setIsloading(false)
      store.dispatch(setUser(_mesUser))
    }).catch((reason) => {
      console.error(reason)

      setIsloading(false)
    })
  }, [])

  if (!isAuth && isLoading) return <>Loading...</>
  else return <RouterProvider router={router} ></RouterProvider>
}



const router = createBrowserRouter([
  {
    path: APP_URL.ROOT,
    element: <App />,
  },
  {
    path: APP_URL.APP_URL_ROOT,
    children: [{
      path: APP_URL.APP_WORKTIME_RECORD,
      element: <WorkTimeRecord />,
    }],
  },
  {
    path: "Login",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
]);

function DoLogout() {
  store.dispatch(resetUser({}))
  window.location.replace("/")

}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
        <NavBar></NavBar>
        <MyRouter></MyRouter>
    </Provider>
  </React.StrictMode>,
);
