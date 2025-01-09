import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../containers/Login";
import Register from "../containers/Register";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
