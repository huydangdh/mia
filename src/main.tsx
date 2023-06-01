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
import TestUI from "./pages/test.tsx";

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

  if (!isAuth && isLoading) {
    return (
      <Card style={{ width: '18rem' }}>
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
  {
    path: "TestUI",
    element: <TestUI />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <NavBar></NavBar>
    <Container>
      <MyRouter></MyRouter>
    </Container>
  </Provider>
)
