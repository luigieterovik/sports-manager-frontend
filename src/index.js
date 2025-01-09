import React from "react";
import ReactDOM from "react-dom/client";

import GlobalStyles from "./styles/GlobalStyles";

import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AllRoutes />
    </React.StrictMode>
    <GlobalStyles />
  </BrowserRouter>
);
