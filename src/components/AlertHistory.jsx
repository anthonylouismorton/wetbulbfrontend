import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import { ProgramContext } from '../context/program';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Typography,
  Grid
} 
from '@mui/material';

export default function AlertHistory() {
  const user = useContext(ProgramContext);
  const [wbgts, setwbgts] = useState([]);
  const { isAuthenticated } = useAuth0();
  const columns = [
    { field: 'id', headerName: 'Alert ID', width: 70 },
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'flagCondition', headerName: 'Flag', width: 130 },
    { field: 'directWBGT', headerName: 'Direct WBGT (\u00B0F)', width: 130 },
    { field: 'shadedWBGT', headerName: 'Shaded WBGT (\u00B0F)', width: 150 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 }
  ];

  const getAllAlerts = async () => {
    const getWbgts = await axios.get(`${process.env.REACT_APP_DATABASE}/userwbgts/${user.userProfile.userId}`);
    if(getWbgts.data.length > 1){
      const wbgtList = getWbgts.data.map((wbgt) => {
        console.log(wbgt)
        let flag = ''
        if(wbgt.directWBGT < 82){
          flag = 'none'
        }
        else if(wbgt.directWBGT < 85){
          flag = 'Green'
        }
        else if(wbgt.directWBGT < 88){
          flag = 'Yellow'
        }
        else if(wbgt.directWBGT < 90){
          flag = 'Red'
        }
        else if(wbgt.directWBGT > 90){
          flag = 'Black'
        }
        console.log(wbgt.wbgtId)
        return {
          id: parseInt(wbgt.wbgtId),
          location: wbgt.alert.location,
          flagCondition: flag,
          directWBGT: wbgt.directWBGT,
          shadedWBGT: wbgt.shadedWBGT,
          date: wbgt.date,
          time: wbgt.time,
          wbgtId: wbgt.wbgtId,
          alertId: wbgt.alertId
  
        }
      })
      setwbgts(wbgtList)
    }
  }

  // useEffect(() => {
  //   getAllAlerts()
  // },[isAuthenticated])
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
        marginBottom: '20px',
        flexDirection: 'column'
      }}
    >
    <Typography>Alert History</Typography>
    <Grid 
      sx={{ 
      height: 400, 
      width: '750px',
      alignItems: 'center',
      justifyContent: 'center',
      }}>
    <DataGrid
      rows={wbgts}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
    </Grid>
  </Grid>
  );
}