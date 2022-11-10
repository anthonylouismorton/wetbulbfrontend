import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button
} from '@mui/material';
import axios from 'axios'
import { Autocomplete } from '@react-google-maps/api';

export default function QuickSearch() {
  const defaultInformation = {
    weatherInfo: {
      barometer: "",
      humidity: "",
      temperature: "",
      windspeed:""
    },
    wgbtInfo: {
      solarRadiance: '',
      directWBGT: '',
      heatIndex: '',
      shadedWBGT: ''
    }
  }
  const [address, setaddress] = useState('')
  const [coords, setcoords] = useState({})
  const [information, setInformation] = useState(defaultInformation)
  const handleSubmit = async (e) => {
    e.preventDefault()
    let refinedAddress = address.replace(' ', '+')
    let latLonSearch = await axios.get(`https://geocode.maps.co/search?q=${refinedAddress}`)
    console.log(latLonSearch)
    let trimmedLat = parseFloat(latLonSearch.data[0].lat).toFixed(2)
    let trimmedLon = parseFloat(latLonSearch.data[0].lon).toFixed(2)

    try{
      let wgbtData = await axios.get(`http://localhost:3001/scraper?lat=${trimmedLat}&lon=${trimmedLon}`)
      console.log(wgbtData)
      setcoords({
        lat: trimmedLat,
        lon: trimmedLon
      })
      setInformation(wgbtData.data)
    }
    catch(e){
      console.log(e)
    }
  }

  const handleChange = (e) => {
    setaddress(e.target.value)
  }

  useEffect(() => {

  },[information])

  return (
    <>
    <Box>
      <Typography>Quick Search</Typography>
        <Grid>
          <form onSubmit={handleSubmit}>
          {/* <Autocomplete>
            <TextField
              placeholder="Address"
              value={address}
              onChange={handleChange}
            />
          </Autocomplete> */}
          <TextField
            placeholder="Address"
            value={address}
            onChange={handleChange}
          />
          <Button type="submit" variant='contained'>Submit</Button>
          </form>
        </Grid>
    </Box>
    <Box>
      <Typography>WGBT</Typography>
        <Grid>
          <TextField
            value={`${information.wgbtInfo.directWBGT}`}
            label={'Direct WGBT (\u00B0F)'}
          />
          <TextField
            value={`${information.wgbtInfo.shadedWBGT}`}
            label={'Shaded WGBT (\u00B0F)'}
          />
          <TextField
            value={`${information.wgbtInfo.heatIndex}`}
            label={'Heat Index (\u00B0F)'}
          />
          <TextField
            value={`${information.wgbtInfo.solarRadiance}`}
            label={'Estimated Solar Radiance (W/m)'}
          />
        </Grid>
    </Box>
    <Box>
      <Typography>Weather Information</Typography>
        <Grid>
          <TextField
            value={`${information.weatherInfo.barometer}`}
            label={'Barometer (in/Hg)'}
          />
          <TextField
            value={`${information.weatherInfo.humidity}`}
            label={'Humidity (%)'}
          />
          <TextField
            value={`${information.weatherInfo.temperature}`}
            label={'Dry Temp (\u00B0F)'}
          />
          <TextField
            value={`${information.weatherInfo.windspeed}`}
            label={'Wind Speed (MPH)'}
          />
        </Grid>
    </Box>
  </>
  )
}