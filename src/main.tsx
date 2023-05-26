import React, { createContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch, MesUser, resetUser, setUser, useMesSelector } from "./store.ts";
import LoginPage from "./pages/Login.tsx";
import "w3-css";
import WorkTimeRecord from "./pages/app/worktime_record.tsx";
import { APP_URL } from "./dataMock.ts";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { GetCurrentUser } from "./util/mock.ts";

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
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="w3-bar w3-black">
        <a href="/" className="w3-bar-item w3-button">Home</a>
        <a href="#" className="w3-bar-item w3-button">Link 1</a>
        <a href="#" className="w3-bar-item w3-button">Link 2</a>
        <a href="#" className="w3-bar-item w3-button w3-red" onClick={DoLogout}>Logout</a>
      </div>
      <div className="w3-container">
        <MyRouter></MyRouter>
      </div>
    </Provider>
  </React.StrictMode>,
);
