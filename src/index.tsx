import MainRouter from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createRoot } from "react-dom/client";

import MyAuthProvider from "./context/MyAuthProvider";
import LoginComponent from "./devSection/LoginTest";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

const isDevCon = true

if (isDevCon) {
  root.render(
    <MyAuthProvider>
      <h1>Dev con</h1>
      <LoginComponent/>
    </MyAuthProvider>
  )
} else {
  root.render(
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}
