import StepRouter from "./routes";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { createRoot } from "react-dom/client";

import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <Provider store={store}>  
      <StepRouter />
  </Provider>
);
