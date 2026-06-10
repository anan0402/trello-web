import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/global.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { injectStore } from "./utils/authorizeAxiosInstance.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import environment from "./utils/environment.js";

const persistor = persistStore(store);

//Inject store to authorizeAxiosInstance vì authorizeAxiosInstance không phải là componenet file nên không thể sử dụng useSelector
injectStore(store);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={environment.googleClientId}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
  // </StrictMode>,
);
