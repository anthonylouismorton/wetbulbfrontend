import React from "react";
import Quicksearch from "./Quicksearch";
import Dashboard from "./Dashboard";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

export default function Main() {

  return (
    <Routes>
      <Route
        path='/'
        element={<Quicksearch/>}
      />
      <Route
        path='/QuickSearch'
        element={<Quicksearch/>}
      />
      <Route
        path='/Dashboard'
        element={<Dashboard/>}
      />
    </Routes>
  )
}