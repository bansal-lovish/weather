'use client'
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchCitiesByCountry, fetchCountries } from "@/store/search";
import {

  Box,
  Grid,
  OutlinedInput,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Homes from "../home";
import './index.css'
import Layout from "../pages";
const Header = () => {
  const [country, setCountry] = useState<any>();
  const [city, setCity] = useState<any>();
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const countries = useSelector((state: any) => state.country.data.data);

  useEffect(() => {
    if (country) {
        dispatch(fetchCitiesByCountry(country));
    }
}, [country, dispatch]);
  const cities = useSelector((state: any) => state.country.cities.data);
  console.log(cities,'cities')
const handleCountryChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{

  setCountry(e.target.value)
}
const handleCityChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
  setCity(e.target.value)
}
  return (
   <>
    <div className="main" >
 <select name="Countries" id="countries"  onChange={(e)=>handleCountryChange(e)} className="select-countries" defaultValue={country}>
 <option value="null" selected disabled>Choose Your Country...</option>
  {countries && countries.map((data:any,i:any)=>(
  <option value={data?.name} key={i}  >{data?.name}</option>
  ))}
  

  </select>

  {country && (
     <select name="Cities" id="cities"  onChange={(e)=>handleCityChange(e)} className="select-cities" defaultValue={city}>
     <option value="null" selected disabled>Choose your City....</option>
      {cities && cities.map((data:any,i:any)=>(
      <option value={data} key={i} >{data}</option>
      ))}
      
    
      </select>
  )}

    </div>
    <div>
  <Homes city={city} country={country}/>
  </div>
  </>
  );
};

export default Header;
