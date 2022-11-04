import React, { useState } from 'react';
import Alerts from "./NewAlertForm";
import AlertHistory from "./AlertHistory";
import { Button } from '@mui/material/';

export default function Dashboard() {
  const [newalert, setnewalert] = useState(false)
  console.log(newalert)
  return (
    <>
    {newalert === false &&
    <Button variant="contained" onClick={()=> setnewalert(!newalert)}>New Alert</Button>
    }
    {newalert &&
    <Alerts/>
    }
    <AlertHistory/>
    </>
  )
}