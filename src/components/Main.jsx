import React from "react";
import Quicksearch from "./Quicksearch";
import Dashboard from "./Dashboard";
import { Routes, Route } from 'react-router-dom';
import { Grid
 } from '@mui/material'

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