import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography
} from '@mui/material';
// import { Autocomplete } from '@react-google-maps/api';

export default function Quickresults() {
  
  return (
    <Box>
      <Typography>WGBT Results</Typography>
      <Grid>
        <TextField
          label='Direct Sunlight WGBT'
          value='Value'
        />
        <TextField
          label='Shaded WGBT'
          value='Value'
        />
        <TextField
          label='Heat Index'
          value='Value'
        />
        <TextField
          label='Estimated Solar Radiance'
          value='Value'
        />

      </Grid>

    </Box>
  )
}