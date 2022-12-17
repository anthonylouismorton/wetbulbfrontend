import React from "react";
import Quicksearch from "./Quicksearch";
import Dashboard from "./Dashboard";
import { Routes, Route } from 'react-router-dom';


export default function Main(props) {
  return (
      <Routes>
        <Route
          path='/'
          element={<Quicksearch/>}
        />
        <Route
          path='/Home'
          element={<Quicksearch/>}
        />
        <Route
          path='/QuickSearch'
          element={<Quicksearch/>}
        />
        <Route
          path='/Dashboard'
          element={<Dashboard user={props.user}/>}
        />
      </Routes>
  )
}