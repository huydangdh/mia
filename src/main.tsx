import { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  json,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store, {
  MesUser,
  resetUser,
  setUser,
  useMesSelector,
} from "./store.ts";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./pages/Login.tsx";
import WorkTimeRecord from "./pages/app/worktime_record.tsx";
import { APP_URL, database } from "./dataMock.ts";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import NavBar from "./NavBar.tsx";
import { Card, Container, Placeholder } from "react-bootstrap";
import TestUI from "./pages/test.tsx";
import WorkTimeQuery from "./pages/app/worktime_query.tsx";
import { supabase } from "./lib/supabase.ts";
import { LogsContainer } from "./lib/consolefeed.tsx";

export const MyContext = createContext<MesUser | undefined | any>(undefined)

function MyRouter() {
  const isAuth = useMesSelector((s) => s.mesUserState.user.isAuthed);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (!isLoading) return undefined;
    supabase.auth.getSession().then(({ data, error }) => {
      console.log(`[i] data: ${JSON.stringify(data)}; ${JSON.stringify(error)}`);
      if (data.session != null) {
        store.dispatch(setUser(database.user))
      }
      setIsloading(false)
    })
    // return () => data.subscription.unsubscribe()
    // GetCurrentUser()
    //   .then((value) => {
    //     _mesUser = value;
    //     console.log(JSON.stringify(_mesUser));
    //     setIsloading(false);
    //     store.dispatch(setUser(_mesUser));
    //   })
    //   .catch((reason) => {
    //     console.error(reason);
    //
    //     setIsloading(false);
    //   });
    
    const {data} = supabase.auth.onAuthStateChange((event, session) => {
      if(event == "SIGNED_IN"){
        store.dispatch(setUser(database.user))
      }
      
    })

    return () => data.subscription.unsubscribe()
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
      {
        path: APP_URL.APP_WORKTIME_QUERY,
        element: <WorkTimeQuery />
      }
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
  <>
    <Provider store={store}>
      <NavBar></NavBar>
      <Container>
        <MyRouter></MyRouter>
      </Container>
    </Provider>
    <p></p>
    <p></p>
    <LogsContainer />
  </>
)
