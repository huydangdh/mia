import React, { createContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store, {
  AppDispatch,
  MesUser,
  resetUser,
  setUser,
  useMesSelector,
} from "./store.ts";
import LoginPage from "./pages/Login.tsx";
{
  /* The following line can be included in your src/index.js or App.js file */
}
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";

import WorkTimeRecord from "./pages/app/worktime_record.tsx";
import { APP_URL } from "./dataMock.ts";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { GetCurrentUser } from "./util/mock.ts";
import NavBar from "./NavBar.tsx";
import { Card, Container, Placeholder } from "react-bootstrap";

export const MyContext = createContext<MesUser | undefined | any>(undefined);

function MyRouter() {
  const isAuth = useMesSelector((s) => s.mesUserState.user.isAuthed);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    let _mesUser = undefined;
    if (!isLoading) return undefined;
    GetCurrentUser()
      .then((value) => {
        _mesUser = value;
        console.log(JSON.stringify(_mesUser));
        setIsloading(false);
        store.dispatch(setUser(_mesUser));
      })
      .catch((reason) => {
        console.error(reason);

        setIsloading(false);
      });
  }, []);

  if (!isAuth && isLoading){
    return (
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src={'data:image/svg+xml;charset=UTF-8,%3Csvg width%3D"286" height%3D"180" xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" viewBox%3D"0 0 286 180" preserveAspectRatio%3D"none"%3E%3Cdefs%3E%3Cstyle type%3D"text%2Fcss"%3E%23holder_1885831cc06 text %7B fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C Helvetica%2C Open Sans%2C sans-serif%2C monospace%3Bfont-size%3A14pt %7D %3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg id%3D"holder_1885831cc06"%3E%3Crect width%3D"286" height%3D"180" fill%3D"%23373940"%3E%3C%2Frect%3E%3Cg%3E%3Ctext x%3D"107.5078125" y%3D"96.3"%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'} /> */}
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    )
  }
  else return <RouterProvider router={router}></RouterProvider>;
}

const router = createBrowserRouter([
  {
    path: APP_URL.ROOT,
    element: <App />,
  },
  {
    path: APP_URL.APP_URL_ROOT,
    children: [
      {
        path: APP_URL.APP_WORKTIME_RECORD,
        element: <WorkTimeRecord />,
      },
    ],
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


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
      <NavBar></NavBar>
      <Container>
        <MyRouter></MyRouter>
      </Container>
    </Provider>
)
