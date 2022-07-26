import { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl } from "react-mapbox-gl";
import { cairnsData } from "../assets/data/cairns.geojson.js";
import './BasicMap.css';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_KEY
});


/**
 *
 * @param {object} mapData
 * @param {object} (mapData.bounds) The Bounding Box data to limit the tiles returned.
 * @param {object | mapboxgl.Coordinate[]} (mapData.mapOutline) The geometry to draw around the area we're focussing on.
 * @param {object | mapboxgl.Coordinate} (mapData.points)
 * @returns
 */
export function ReactMapBoxGL(mapData) {

  const [lng, setLng] = useState(145.68300247192383)
  const [lat, setLat] = useState(-16.954023059866074)
  const [zoom, setZoom] = useState([11])

  const defaultCoordinates = [lng, lat];
  const polygonCoordinates = mapData?.mapOutline || cairnsData.coordinates;
  const randomPoints = mapData?.randomPoints;

  console.log('defaultCoordinates', defaultCoordinates);
  console.log('polygonCoordinates', polygonCoordinates);
  console.log('randomPoints', randomPoints);

  useEffect(() => {
    console.log('mapData updated', mapData)
  }, [mapData])

const lineLayout = {
  'line-cap': 'round' ,
  'line-join': 'round'
};

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 12
};

const polygonPaint = {
  'fill-color': '#6F788A',
  'fill-opacity': 0.7
};

function handleOnMove(data) {
  console.log(data);

}

  return (
    <>
    <DisplayZoomPlusCoordinates lng={lng} lat={lat} zoom={zoom} />
    <Map
      style={"mapbox://styles/mapbox/streets-v11"}
      center={[lng, lat]}
      zoom={zoom}
      containerStyle={{
        flex: 1,
        height: "90vh",
        width: "100vw"
      }}
      onMove={(data) => handleOnMove(data)}
    >

            <ScaleControl/>
            <ZoomControl/>
      <Layer type={"fill"} paint={polygonPaint}>
        <Feature coordinates={polygonCoordinates} />
      </Layer>
      <PolygonMap polygonCoordinates={polygonCoordinates} paintColour={polygonPaint} />
        { mapData && mapData?.randomPoints?.map((point) => {
          <Layer type={"marker"} paint={{
            "fill-color": '#aaafff',
            'fill-opacity': 0.7
            }}>
          <Feature coordinates={point} />
        </Layer>
        })
      }
 </Map>
    </>
  )
}


export function DisplayZoomPlusCoordinates({lng, lat, zoom}) {

  return (<div className="sidebar"> Longitude: {lng.toFixed(5)} | Latitude: {lat.toFixed(5)} | Zoom: {zoom} </div>);
}

export function PolygonMap({ polygonCoordinates, paintColour }) {

  console.log('polygonCoordinates', polygonCoordinates);
  console.log('polygon paintColour', paintColour)

  return (
    <Layer type="fill" paint={paintColour}>
      <Feature coordinates={polygonCoordinates} />
    </Layer>);

}