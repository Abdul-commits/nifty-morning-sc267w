import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import Login from "../src/pages/login";
import Planet from "../src/pages/planet";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/planet" element={<Planet />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
