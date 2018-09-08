import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 39.286897, lng: -76.641673 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 39.286897, lng: -76.641673 }} />}
  </GoogleMap>
))

export default MyMapComponent;
