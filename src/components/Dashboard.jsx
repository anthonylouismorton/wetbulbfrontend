import React, { useState } from 'react';
import NewAlertForm from "./NewAlertForm";
import AlertHistory from "./AlertHistory";
import { Button } from '@mui/material/';
import AlertList from './AlertList';

export default function Dashboard() {
  const [newalert, setnewalert] = useState(false)
  return (
    <>
    {newalert === false &&
    <Button variant="contained" onClick={()=> setnewalert(!newalert)}>New Alert</Button>
    }
    {newalert &&
    <NewAlertForm setnewalert={setnewalert}/>
    }
    {newalert === false &&
    <>
    <AlertList alert={alert}/>
    <AlertHistory/>
    </>
    }
    </>
  )
}