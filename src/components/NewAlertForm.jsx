import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  RadioGroup,
  Tooltip,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import axios from 'axios'
// import { Autocomplete } from '@react-google-maps/api';

export default function Alerts() {
  const defaultAlert = {
    address: '',
    emails: [''],
    flag: 'all'
    
  }
  const [alert, setalert] = useState(defaultAlert)
  const [radio, setRadio] = useState('all')

  const handleChange = (e) => {
    const {name, value} = e.target
    setRadio(e.target.value)
    setalert({
      ...alert,
      [name]: value
    })
  };

  const handleRemoveEmail = (index, flow) => {
    let emailArray = alert.emails;
    emailArray.splice(index, 1)
    setalert({
      ...alert,
      emails: emailArray
    });
  };

  const handleNewEmail = () => {
    let emailArray = alert.emails
    emailArray.push('')
    setalert({
      ...alert,
      emails: emailArray
    });
  };

  const handleEmail = (index, e) => {
    let emailArray = alert.emails
    const {name, value} = e.target
    emailArray[index] = value
    setalert({
      ...alert,
      [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
  };

  console.log(alert.emails)
  return (
    <Box>
      <Typography>Setup Alerts</Typography>
        <Grid>
          <form onSubmit={handleSubmit}>
            <Grid>
              <TextField
                label="Location"
                placeholder="Enter Location you want a WGBT alert for"
                name="address"
                value={alert.address}
                onChange={handleChange}
              />
              <FormLabel component="legend">Choose Flag Condition for Alerts</FormLabel>
                <RadioGroup aria-label="Flag" name="flag" value={radio} onChange={handleChange}>
                  <FormControlLabel value="all" control={<Radio />} label="All Temps" />
                  <FormControlLabel value="green" control={<Radio />} label="Green Flag and higher (<82 degrees F)" />
                  <FormControlLabel value="yellow" control={<Radio />} label="Yellow Flag and higher (<85 degrees F)" />
                  <FormControlLabel value="red" control={<Radio />} label="Red Flag and higher (<88 degrees F)" />
                  <FormControlLabel value="black" control={<Radio />} label="Black Flag and higher (<90 degrees F)" />
                </RadioGroup>
              <FormLabel component="legend">Email Distribution List</FormLabel>
              {alert.emails.map((flow,index) => 
              <Grid key = {index}>
                <TextField
                name='ventFlow'
                id='outlined-multiline-static'
                label={`Email ${index+1}`}
                value={alert.emails[index]}
                rows={1}
                onChange={(e)=> handleEmail(index, e)}
                />
                {index === 0 ?
                <Tooltip title="Add Measurement">
                  <IconButton onClick={handleNewEmail}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                :
                <Tooltip title="Remove Measurement">
                  <IconButton onClick={()=> handleRemoveEmail(index, flow)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
                }
                </Grid>
              )
            }
            </Grid>
          <Button type="submit" variant='contained'>Submit</Button>
        </form>
      </Grid>
    </Box>
  )
}