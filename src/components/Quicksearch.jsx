import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import axios from 'axios'
import Quickresults from './Quickresults'
import AddressAutoComplete from './reusableComponents/AddressAutoComplete';

export default function QuickSearch() { 
  const [location, setlocation] = useState(null);

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
  const [coords, setcoords] = useState({})
  const [information, setInformation] = useState(defaultInformation)
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(location)
    let refinedAddress = location.description.replace(' ', '+')
    let latLonSearch = await axios.get(`https://geocode.maps.co/search?q=${refinedAddress}`)
    let trimmedLat = parseFloat(latLonSearch.data[0].lat).toFixed(2)
    let trimmedLon = parseFloat(latLonSearch.data[0].lon).toFixed(2)

    try{
      let wgbtData = await axios.get(`http://localhost:3001/quickSearch?lat=${trimmedLat}&lon=${trimmedLon}`)
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

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <AddressAutoComplete setlocation={setlocation}/>
        <Button type="submit" variant='contained'>Submit</Button>
      </form>
        <Quickresults information={information}/>
    </Box>
  )
}