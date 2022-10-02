import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "styled-components";
import { Theme } from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
