import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography
} from '@mui/material';
// import { Autocomplete } from '@react-google-maps/api';

export default function Quickresults(props) {
  
  return (
    <>
    <Box>
      <Typography>WGBT</Typography>
        <Grid>
          <TextField
            value={`${props.information.wgbtInfo.directWBGT}`}
            label={'Direct WGBT (\u00B0F)'}
          />
          <TextField
            value={`${props.information.wgbtInfo.shadedWBGT}`}
            label={'Shaded WGBT (\u00B0F)'}
          />
          <TextField
            value={`${props.information.wgbtInfo.heatIndex}`}
            label={'Heat Index (\u00B0F)'}
          />
          <TextField
            value={`${props.information.wgbtInfo.solarRadiance}`}
            label={'Estimated Solar Radiance (W/m)'}
          />
        </Grid>
      </Box>
      <Box>
      <Typography>Weather Information</Typography>
        <Grid>
          <TextField
            value={`${props.information.weatherInfo.barometer}`}
            label={'Barometer (in/Hg)'}
          />
          <TextField
            value={`${props.information.weatherInfo.humidity}`}
            label={'Humidity (%)'}
          />
          <TextField
            value={`${props.information.weatherInfo.temperature}`}
            label={'Dry Temp (\u00B0F)'}
          />
          <TextField
            value={`${props.information.weatherInfo.windspeed}`}
            label={'Wind Speed (MPH)'}
          />
        </Grid>
      </Box>
    </>
  )
}