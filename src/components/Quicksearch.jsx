import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button
} from '@mui/material';
import axios from 'axios'
// import { Autocomplete } from '@react-google-maps/api';

export default function QuickSearch() {
  const defaultInformation = {
    weatherInfo: {
      barometer: "",
      humidity: "",
      temperature: "",
      windspeed:""
    },
    wgbtInfo: {
      csi: '',
      directWGBT: '',
      heatIndex: '',
      shadeWBGT: ''
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
        {/* <form onSubmit={handleSubmit}>
          <Autocomplete>
            <TextField
              placeholder="Address"
              value={address}
              onChange={handleChange}
            />
          </Autocomplete>
        </form> */}
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
            value={`${information.wgbtInfo.directWGBT} \u00B0F`}
            label={'Direct WGBT'}
          />
          <TextField
            value={`${information.wgbtInfo.shadeWBGT} \u00B0F`}
            label={'Shaded WGBT'}
          />
          <TextField
            value={`${information.wgbtInfo.heatIndex} \u00B0F`}
            label={'Heat Index'}
          />
          <TextField
            value={`${information.wgbtInfo.csi} W/m^2`}
            label={'Estimated Solar Radiance'}
          />
        </Grid>
    </Box>
    <Box>
      <Typography>Weather Information</Typography>
        <Grid>
          <TextField
            value={`${information.weatherInfo.barometer} in/Hg`}
            label={'Barometer'}
          />
          <TextField
            value={`${information.weatherInfo.humidity}%`}
            label={'Humidity'}
          />
          <TextField
            value={`${information.weatherInfo.temperature} \u00B0F`}
            label={'Dry Temp'}
          />
          <TextField
            value={`${information.weatherInfo.windspeed} MPH`}
            label={'Wind Speed'}
          />
        </Grid>
    </Box>
  </>
  )
}