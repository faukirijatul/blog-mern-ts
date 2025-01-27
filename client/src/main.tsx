import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <>
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
      <Toaster position="bottom-right" />
    </GoogleOAuthProvider>
    </Provider>
  </>
);
