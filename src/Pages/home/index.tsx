/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { AppDispatch } from "@/store";
import { fetchForecast, fetchWeather } from "@/store/home";
import { fetchCitiesByCountry, fetchCountries } from "@/store/search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import Search from "../search";

import Image from "next/image";

import Layout from "../pages";
import Graph from "../Graph";
const Homes = ({ city, country }: any) => {
  console.log(`${city}-${country?.name}`);
   const dispatch = useDispatch<AppDispatch>();
  const [query, setquery] = useState("");

  useEffect(() => {
    if (country && city) {
      setquery(`${city}-${country?.name}`);
    }
    if (query) {
      // dispatch(fetchWeather(query));
      dispatch(fetchForecast(query));
    }
  }, [city, country, dispatch, query]);

  const current = useSelector((state: any) => state.weather.data);

  const forecast = useSelector((state: any) => state.weather.forecast);

  const[graphdata,setGraphData]=useState(forecast.forecast?.forecastday[0])
console.log('graphdata --->', graphdata);
useEffect(() => {
  if (forecast && forecast.forecast && forecast.forecast.forecastday.length > 0) {
    setGraphData(forecast.forecast.forecastday[0]);
  }
}, [forecast,]);
  const showGraph=(weather:any)=>{
    // console.log(weather,'weather')
    setGraphData(weather)
  }
  
  if (forecast.length === 0) {
    return (
      <div
        className="container"
 

      >
        <h6> Select your Location!</h6>
      </div>
    ); 
  }
  return (
 <>
 
  <div className="main-view">


  <div className="header">
    <p>{forecast.location.name},{forecast.location.country}</p>
    {/* <img src='' className="header-img"/>
    <img src='' className="header-img"/> */}
  </div>
<div>
<div className="header-sec">
  <div>
    <p>current Weather</p>
    <p>{forecast.location.localtime}</p>
  </div>
  <div className="header-box">
    <p>See things differently?</p>
  </div>
</div>


<div className="header-sec">
  <div className="header">
  <img src={forecast.current.condition.icon} className="contentToday-headone-img"/>
  <p className="contentToday-headone-heading">{forecast.current.temp_c}&#176;c</p>
  </div>
  <div>
    <p  className="contentToday-headtwo-heading">{forecast.current.condition.text} </p>
    <p>Feels Like {forecast.current.feelslike_c}&#176;</p>
  </div>
</div>


<div>
  <p className="main-head">There will be mostly sunny skies. The high will be {forecast.forecast.forecastday[0].day.maxtemp_c  }&#176;</p>
</div>

<div className="weather">
  <div className="weather-1">
    <p>DewPoint</p>
    <p>{forecast.current.dewpoint_c}</p>
  </div>
  <div className="weather-1">
    <p>Wind</p>
    <p>{forecast.current.wind_kph}km/h</p>
  </div>
  <div className="weather-1">
    <p>Humidity</p>
    <p>{forecast.current.humidity}%</p>
  </div>
  <div className="weather-1">
    <p>Precipitation</p>
    <p>{forecast.current.precip_in} in</p>
  </div>
  <div className="weather-1">
    <p>visibility</p>
    <p>{forecast.current.vis_km} km</p>
  </div>
  <div className="weather-1">
    <p>Pressure</p>
    <p>{forecast.current.pressure_mb} mb</p>
  </div>
</div>


<div>
  <p className="main-head" >3 Days ForeCast</p>
</div>
<div className="weather">
  {forecast.forecast.forecastday.map((weather:any,i:any)=>(
<div key={i} className="weather-1" onClick={()=>showGraph(weather)}>
  <div>
    <p>{weather.date}</p>
  </div>
  <div className="contentToday-head">
  <div>
    <img src={weather.day.condition.icon} className="contentToday-headone-img"/>
  </div>
  <div>
    <p>{weather.day.mintemp_c}&#176;c</p>
    <p>{weather.day.maxtemp_c}&#176;c</p>
  </div>
  <div>
    <p>{weather.day.condition.text}</p>
    <p>{weather.day.avgtemp_c}&#176;</p>
  </div>
</div>
</div>
))}










</div>
<div>
  <p className="main-head" >Hourly Update</p>
</div>
<Graph data={graphdata}/>
  </div>
  </div>
  </>
   
  );
};

export default Homes;
