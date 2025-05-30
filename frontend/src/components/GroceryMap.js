import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const defaultMarkers = [
  { position: [40.761, -73.982], popup: 'Morton Williams Grocery' },
  { position: [40.754, -73.990], popup: 'Target Grocery' },
  { position: [40.749, -73.987], popup: 'Fairway Market' },
];

const GroceryMap = ({ center = [40.758, -73.9855], zoom = 13, markers = defaultMarkers, style = { height: '220px', width: '100%' } }) => (
  <MapContainer center={center} zoom={zoom} style={style} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {markers.map((m, i) => (
      <Marker key={i} position={m.position}>
        <Popup>{m.popup}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default GroceryMap; 