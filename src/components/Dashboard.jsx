import React, { useState } from 'react';
import NewAlertForm from "./NewAlertForm";
import AlertHistory from "./AlertHistory";
import { Button } from '@mui/material/';
import AlertList from './AlertList';

export default function Dashboard() {
  const [newalert, setnewalert] = useState(false)
  return (
    <>
    {newalert &&
    <NewAlertForm setnewalert={setnewalert}/>
    }
    {newalert === false &&
    <>
    <AlertList newalert={newalert} setnewalert={setnewalert}/>
    <AlertHistory/>
    </>
    }
    </>
  )
}