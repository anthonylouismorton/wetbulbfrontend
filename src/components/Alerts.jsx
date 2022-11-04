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

export default function Alerts() {
  const defaultAlert = {
    emails: ['']
  }
  const [alert, setalert] = useState(defaultAlert)
  const handleChange = (e) => {
    setaddress(e.target.value)
  }

  return (
    <Box>
      <Typography>Setup Alerts</Typography>
        <Grid>
          <form>
            <Grid>
              {alert.emails.map((email) => (
                <TextField
                name=""
                label="Alert Email"
                placeholder="Enter Email"
                value={email}
                onChange={handleChange}
                />
              ))}
            </Grid>
          {/* <TextField
            name=""
            label="Alert Email"
            placeholder="Enter Email"
            value={alert.emails[0]}
            onChange={handleChange}
          />
          <Button type="submit" variant='contained'>Submit</Button> */}
        </form>
      </Grid>
    </Box>
  )
}