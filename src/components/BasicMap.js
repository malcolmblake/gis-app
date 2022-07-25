import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './BasicMap.css';
import { ReactMapBoxGL } from './ReactMapBoxGL';
import { cairnsData } from '../assets/data/cairns.geojson.js';
import { Button } from './common/Button';
import { fetchData } from '../services/fetchData';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export function BasicMap() {

  // Map values from API
  const [mapData, setMapData] = useState({
    boundingBox: cairnsData.coordinates,
    mapOutline: [],
    randomPoints: [],
  });

  const reloadData = useRef();
  reloadData.current = false;

  useCallback(async() => {

    if(!reloadData.current) return;
    reloadData.current = false;
try {
    const newData = await fetchData();
    setMapData(newData);
}
catch(error){
  console.log('error',error);
}
  }, [reloadData]);

  function reloadMapData() {
    reloadData.current = true;
  }

  return (
    <>
      <Button classes={"small"} onClick={()=> reloadMapData()} text={"Reload Map Data"}/>
      <ReactMapBoxGL mapData={mapData} />
    </>)
}
