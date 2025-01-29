import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../containers/Login";
import Register from "../containers/Register";
import AvailableCourts from "../containers/Home";
import ReservasList from "../containers/Reservations";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<AvailableCourts />} />
      <Route path="/reservations" element={<ReservasList />} />
    </Routes>
  );
}
