import { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store, { MesUser, resetUser, setUser, useMesSelector } from "./store.ts";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./pages/Login.tsx";
import WorkTimeRecord from "./pages/app/worktime_record.tsx";
import { APP_URL } from "./dataMock.ts";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Card, Container, Placeholder } from "react-bootstrap";
import TestUI from "./pages/test.tsx";
import WorkTimeQuery from "./pages/app/worktime_query.tsx";
import { LogsContainer } from "./lib/consolefeed.tsx";
import { MesUINavBar } from "./MesUI.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import useMesAuth from "./hooks/useAuth.tsx";
import supabase from "./api/supabase.ts";

export const MyContext = createContext<MesUser | undefined | any>(undefined);

function MyRouter() {
  const { checkUser } = useMesAuth();

  useEffect(() => {
    // Add onAuthStateChange listener when the component mounts
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // User has signed in, update the user state in the app
        checkUser();
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [checkUser]);


  return <RouterProvider router={router}></RouterProvider>;
}

const router = createBrowserRouter([
  {
    path: APP_URL.ROOT,
    element: <ProtectedRoute><App /></ProtectedRoute>,

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
        element: <WorkTimeQuery />,
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
    element: <TestUI />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Provider store={store}>
      <MesUINavBar></MesUINavBar>
      <Container>
        <MyRouter></MyRouter>
      </Container>
    </Provider>
    <p></p>
    <p></p>
    <LogsContainer />
  </>,
);
