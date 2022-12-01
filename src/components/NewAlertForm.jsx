import React, { useState, useContext } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ProgramContext } from '../context/program';
import axios from 'axios'
import AddressAutoComplete from './reusableComponents/AddressAutoComplete';

export default function NewAlertForm(props) {
  const user = useContext(ProgramContext);
  const [radio, setRadio] = useState('all');
  const [location, setlocation] = useState('');
  const [frequency, setfrequency] = useState('hourly');
  const defaultAlert = {
    address: '',
    emails: [''],
    flag: radio,
    frequency: frequency
  }
  const [alert, setalert] = useState(defaultAlert);

  const handleChange = (e) => {
    const {name, value} = e.target
    if(name === 'flag'){
      setRadio(e.target.value)
      setalert({
        ...alert,
        [name]: value
      })
    }
    else if(name === 'frequency'){
      setfrequency(e.target.value)
      setalert({
        ...alert,
        [name]: value
      })
    }
    else{
      setalert({
        ...alert,
        [name]: value
      })
    }
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
    e.preventDefault();
    console.log(location);
    let refinedAddress = location.description.replace(' ', '+');
    let latLonSearch = await axios.get(`https://geocode.maps.co/search?q=${refinedAddress}`);
    let trimmedLat = parseFloat(latLonSearch.data[0].lat).toFixed(2);
    let trimmedLon = parseFloat(latLonSearch.data[0].lon).toFixed(2);
    let newAlert = {
      lat: trimmedLat,
      lon: trimmedLon,
      location: location.description,
      flagCondition: alert.flag,
      frequency: alert.frequency,
      userId: parseInt(user.userProfile.userId)
    };
    let createdAlert = await axios.post(`${process.env.REACT_APP_DATABASE}/alert/${parseInt(user.userId)}`, newAlert);
    let alertId = parseInt(createdAlert.data.alertId);
    await Promise.all(alert.emails.map(email => axios.post(`${process.env.REACT_APP_DATABASE}/alertEmail/${alertId}`, {alertId: alertId, alertEmail: email})));
    props.setnewalert(false);
  };
  console.log(alert)
  return (
    <Box>
      <Typography>Setup Alerts</Typography>
        <Grid>
          <form onSubmit={handleSubmit}>
            <Grid>
              {/* <TextField
                label="Location"
                placeholder="Enter Location you want a WGBT alert for"
                name="address"
                value={location}
                onChange={handleChange}
              /> */}
              <AddressAutoComplete setlocation={setlocation}/>
              <FormLabel component="legend">Choose Flag Condition for Alerts</FormLabel>
                <RadioGroup aria-label="Flag" name="flag" value={radio} onChange={handleChange}>
                  <FormControlLabel value="all" control={<Radio />} label="All Temps" />
                  <FormControlLabel value="green" control={<Radio />} label="Green Flag and higher (<82 degrees F)" />
                  <FormControlLabel value="yellow" control={<Radio />} label="Yellow Flag and higher (<85 degrees F)" />
                  <FormControlLabel value="red" control={<Radio />} label="Red Flag and higher (<88 degrees F)" />
                  <FormControlLabel value="black" control={<Radio />} label="Black Flag and higher (<90 degrees F)" />
                </RadioGroup>
              <FormLabel component="legend">Choose Alert Frequency</FormLabel>
              <RadioGroup aria-label="Flag" name="frequency" value={frequency} onChange={handleChange}>
                <FormControlLabel value="hourly" control={<Radio />} label="Hourly" />
                <FormControlLabel value="2hours" control={<Radio />} label="Every 2 hours" />
                <FormControlLabel value="4hours" control={<Radio />} label="Every 4 hours" />
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
          <Button variant='contained' onClick={() => props.setnewalert(false)}>Cancel</Button>
        </form>
      </Grid>
    </Box>
  )
}