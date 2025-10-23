import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store"

const root = ReactDOM.createRoot(document.getElementById("root"));

if (window.Cypress) {
  window.store = store; // ✅ make Redux store accessible to Cypress
}

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


reportWebVitals();