import React, { useState, useEffect, useContext } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton
} from '@mui/material';

import axios from 'axios'
import { ProgramContext } from '../context/program';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

export default function AlertList(props) {
  const [alerts, setAlerts] = useState('')
  const user = useContext(ProgramContext);
  const getAlerts = async () => {
    if(user.userProfile.userId){
      const userAlerts = await axios.get(`${process.env.REACT_APP_DATABASE}/alerts/${parseInt(user.userProfile.userId)}`);
      setAlerts(userAlerts.data)
    }
  }
  useEffect(() => {
    getAlerts();
  },[props.newAlert])
  console.log(alerts)
  return (
      <TableContainer>
        <Table sx={{ minWidth: 650, width: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Flag Condition</TableCell>
              <TableCell align="center">Frequency</TableCell>
              <TableCell align="center">Emails</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <Tooltip title="Add Alert">
                  <IconButton onClick={()=> props.setnewalert(!props.newalert)}>
                    <NotificationAddIcon/>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts !=='' ? alerts.map((row) => (
              <TableRow
                key={row.alert.alertId}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.alert.lat} {row.alert.lon}</TableCell>
                <TableCell align="center">{row.alert.flagCondition}</TableCell>
                <TableCell align="center">{row.alert.frequency}</TableCell>
                <TableCell align="center">{row.emails.map(email => email.alertEmail).join(', ')}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Remove Alert">
                    <IconButton>
                      <DeleteIcon/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Alert">
                    <IconButton>
                      <EditIcon/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )):
            <TableRow
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            align="center"
            >
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">You have no alerts setup</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
  );
}