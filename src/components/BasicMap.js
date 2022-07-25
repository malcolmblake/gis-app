import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './BasicMap.css';
import { ReactMapBoxGL } from './ReactMapBoxGL';
import { cairnsData } from '../assets/data/cairns.geojson.js';
import { Button } from './common/Button';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export function BasicMap() {

  // Map values from API
  const [mapData, setMapData] = useState({
    randomPoints: [],
    bounds: cairnsData.coordinates,
    mapOutline: []
  });

  const [reloadData, setReloadData] = useState(false);

  useCallback(() => {

    if(!reloadData) return;

    async function fetchCoordinates() {
      try {
        const response = fetch(process.env.REACT_APP_API_HOST);
        const { boundingBox, points, mapOutline } = (await response).json();

        setMapData({
          points: points,
          bounds: boundingBox,
          mapOutline: mapOutline
        });
      }
      catch (error) {
        console.error(`Error trying to fetch coordinates: ${error.message}`);
      }
    }

    fetchCoordinates();
    return () => { reloadData = false;}
  }, [reloadData]);

  function reloadMapData() {
    setReloadData(true);
  }

  return (
    <>
      <Button classes={"small"} onClick={()=> reloadMapData()} text={"Reload Map Data"}/>
      <ReactMapBoxGL mapData={mapData} />
    </>)

}