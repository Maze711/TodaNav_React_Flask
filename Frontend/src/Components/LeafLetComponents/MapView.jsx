import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapView = ({
  center,
  zoom = 15,
  fromCoords,
  toCoords,
  fromSearch,
  toSearch,
  isDark
}) => {
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
          <Popup>Pickup: {fromSearch}</Popup>
        </Marker>
      )}
      {toCoords && (
        <Marker position={toCoords}>
          <Popup>Dropoff: {toSearch}</Popup>
        </Marker>
      )}
      {fromCoords && toCoords && (
        <Polyline
          positions={[fromCoords, toCoords]}
          color={isDark ? "#ff9900" : "#0066ff"}
          weight={4}
        />
      )}
    </MapContainer>
  );
};