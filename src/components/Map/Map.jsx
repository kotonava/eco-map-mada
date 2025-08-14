// src/pages/Dashboard/components/Map.jsx

import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "./Map.css";

// Les données GeoJSON que nous utiliserons pour l'exemple
// Plus tard, vous les récupérerez depuis votre API
const geojsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: 1,
        name: "Zone de Manjakaray",
        severity: "haute",
        reports: 50,
      },
      geometry: {
        type: "Point",
        coordinates: [47.5300, -18.8800], // Coordonnées pour Manjakaray
      },
    },
    {
      type: "Feature",
      properties: {
        id: 2,
        name: "Décharge d'Ambohimanarina",
        severity: "moyenne",
        reports: 25,
      },
      geometry: {
        type: "Point",
        coordinates: [47.5250, -18.8750], // Coordonnées pour Ambohimanarina
      },
    },
    {
      type: "Feature",
      properties: {
        id: 3,
        name: "Terrain vague Anosibe",
        severity: "faible",
        reports: 5,
      },
      geometry: {
        type: "Point",
        coordinates: [47.5100, -18.9000], // Coordonnées pour Anosibe
      },
    },
    // Ajoutez d'autres données pour un rendu plus riche
    {
      type: "Feature",
      properties: {
        id: 4,
        name: "Centre de collecte Antananarivo",
        severity: "haute",
        reports: 100,
      },
      geometry: {
        type: "Point",
        coordinates: [47.528, -18.886],
      },
    },
    {
      type: "Feature",
      properties: {
        id: 5,
        name: "Zone d'évacuation 67HA",
        severity: "moyenne",
        reports: 30,
      },
      geometry: {
        type: "Point",
        coordinates: [47.522, -18.910],
      },
    },
  ],
};

// Icônes personnalisées pour les marqueurs
const getIcon = (severity) => {
  let iconUrl;
  switch (severity) {
    case "haute":
      iconUrl = "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
      break;
    case "moyenne":
      iconUrl = "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png";
      break;
    case "faible":
    default:
      iconUrl = "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";
      break;
  }
  return new L.Icon({
    iconUrl: iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const Map = () => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [mapInstance, setMapInstance] = useState(null);

  // Ce composant interne gère la logique de Leaflet.heat
  const HeatmapLayer = () => {
    const map = useMap();
    useEffect(() => {
      if (showHeatmap) {
        const heatPoints = geojsonData.features.map((feature) => [
          feature.geometry.coordinates[1], // Latitude
          feature.geometry.coordinates[0], // Longitude
          feature.properties.reports, // Poids (pour l'intensité de la chaleur)
        ]);
        const heatLayer = L.heatLayer(heatPoints, { radius: 25, blur: 15 });
        map.addLayer(heatLayer);
        return () => {
          map.removeLayer(heatLayer);
        };
      }
    }, [map, showHeatmap]);
    return null;
  };

  const center = [-18.8792, 47.5079]; // Antananarivo, Madagascar

  return (
    <div className="map-container card">
      <div className="map-header">
        <h3 className="title">Carte nationale — Heatmap</h3>
        <div className="map-controls">
          <p className="muted">Couches: {showHeatmap && "heatmap"} {showMarkers && "| points"}</p>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        whenCreated={setMapInstance}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {showMarkers &&
          geojsonData.features.map((feature) => (
            <Marker
              key={feature.properties.id}
              position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
              icon={getIcon(feature.properties.severity)}
            >
              <Popup>
                <strong>{feature.properties.name}</strong>
                <br />
                Gravité : {feature.properties.severity}
                <br />
                Signalements : {feature.properties.reports}
              </Popup>
            </Marker>
          ))}
        
        <HeatmapLayer />
      </MapContainer>
      
      <div className="mt-3 flex items-center gap-3">
        <button
          className={`px-3 py-2 border rounded-md ${showHeatmap ? "active-control" : ""}`}
          onClick={() => setShowHeatmap(!showHeatmap)}
        >
          Basculer Heatmap
        </button>
        <button
          className={`px-3 py-2 border rounded-md ${showMarkers ? "active-control" : ""}`}
          onClick={() => setShowMarkers(!showMarkers)}
        >
          Montrer points
        </button>
        {/* Le bouton de téléchargement GeoJSON ne nécessite pas de logique complexe pour l'instant */}
        <button className="px-3 py-2 border rounded-md">Télécharger GeoJSON</button>
      </div>
    </div>
  );
};

export default Map;