import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the marker icon disappearing in React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// This helper component forces the map to jump to your location
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15); // Zoom level 15 is close enough to see streets
  }, [center, map]);
  return null;
}

const MapView = () => {
  const [position, setPosition] = useState([10.9601, 78.0766]); // Default starting point

  useEffect(() => {
    const options = {
      enableHighAccuracy: true, // Forces GPS instead of just IP address
      timeout: 10000,
      maximumAge: 0
    };

    const success = (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log("Real-time location found:", latitude, longitude);
      setPosition([latitude, longitude]);
    };

    const error = (err) => {
      console.warn(`Location Error (${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <div style={{ height: "450px", width: "100%", borderRadius: "10px", overflow: "hidden" }}>
      <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <ChangeView center={position} />
        <Marker position={position}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;