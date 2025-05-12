import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapView = ({
  center,
  zoom = 15,
  fromCoords,
  toCoords,
  fromSearch,
  toSearch,
  isDark,
  routeProfile = "driving", // You can set this prop to "walking", "cycling", or "driving"
  todaMarkers = [], // New prop for TODA markers
  userLocation, // New prop for user's exact location
}) => {
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (fromCoords && toCoords) {
        // Use the selected profile for more accurate routing
        const url = "https://router.project-osrm.org/route/v1/" + routeProfile + "/" + fromCoords[1] + "," + fromCoords[0] + ";" + toCoords[1] + "," + toCoords[0] + "?overview=full&geometries=geojson";
        const res = await fetch(url);
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          setRouteCoords(
            data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng])
          );
        } else {
          setRouteCoords([]);
        }
      } else {
        setRouteCoords([]);
      }
    };
    fetchRoute();
  }, [fromCoords, toCoords, routeProfile]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
      dragging={true}
      touchZoom={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {fromCoords && (
        <Marker position={fromCoords}>
          <Popup>
            Pickup: {fromSearch}
            <br />
            Lat: {fromCoords[0]}, Lng: {fromCoords[1]}
          </Popup>
        </Marker>
      )}
      {toCoords && (
        <Marker position={toCoords}>
          <Popup>
            Dropoff: {toSearch}
            <br />
            Lat: {toCoords[0]}, Lng: {toCoords[1]}
          </Popup>
        </Marker>
      )}
      {todaMarkers.map((toda, index) => (
        <Marker key={index} position={toda.coordinates}>
          <Popup>
            {toda.name}
            <br />
            {toda.location}
            <br />
            Lat: {toda.coordinates[0]}, Lng: {toda.coordinates[1]}
          </Popup>
        </Marker>
      ))}
      {userLocation && (
        <CircleMarker
          center={userLocation}
          radius={10}
          pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.5 }}
        >
          <Popup>
            Your Location
            <br />
            Lat: {userLocation[0]}, Lng: {userLocation[1]}
          </Popup>
        </CircleMarker>
      )}
      {routeCoords.length > 0 && (
        <Polyline
          positions={routeCoords}
          color={isDark ? "#ff9900" : "#0066ff"}
          weight={4}
        />
      )}
    </MapContainer>
  );
};
