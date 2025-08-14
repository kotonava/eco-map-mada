import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./CarteHeatmap.css";

// ✅ Correction des icônes Leaflet (version CDN)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Données fictives
const SAMPLE_POINTS = [
  { id: 1, name: "Analakely", position: [-18.9137, 47.5361], severity: "critique" },
  { id: 2, name: "Port Toamasina", position: [-18.1492, 49.4023], severity: "élevée" },
  { id: 3, name: "Fianarantsoa", position: [-21.4536, 47.0854], severity: "moyenne" },
];

export default function CarteHeatmap() {
  const [showPoints, setShowPoints] = useState(true);
  const [showHeat, setShowHeat] = useState(true);

  const heatCircles = useMemo(
    () =>
      SAMPLE_POINTS.map((p) => (
        <Circle
          key={`c-${p.id}`}
          center={p.position}
          radius={
            p.severity === "critique"
              ? 18000
              : p.severity === "élevée"
              ? 12000
              : 8000
          }
          pathOptions={{
            color: "#2A5243",
            fillColor: "#2A5243",
            fillOpacity: 0.25,
            weight: 0,
          }}
        />
      )),
    []
  );

  return (
    <div className="carte-container">
      {/* Header */}
      <div className="header">
        <h1>Carte & Heatmap</h1>
        <div className="actions">
          <button onClick={() => setShowHeat((v) => !v)}>
            {showHeat ? "Masquer Heatmap" : "Afficher Heatmap"}
          </button>
          <button onClick={() => setShowPoints((v) => !v)}>
            {showPoints ? "Masquer points" : "Afficher points"}
          </button>
        </div>
      </div>

      <div className="content">
        {/* Filtres */}
        <aside className="sidebar">
          <h3>Filtres</h3>
          <select>
            <option>Région (toutes)</option>
            <option>Analamanga</option>
            <option>Atsinanana</option>
          </select>
          <select>
            <option>Type de déchet (tous)</option>
            <option>Plastique</option>
            <option>Organique</option>
          </select>
          <select>
            <option>Gravité (toutes)</option>
            <option>Faible</option>
            <option>Moyenne</option>
            <option>Élevée</option>
            <option>Critique</option>
          </select>
          <input type="date" />

          <h3>Légende</h3>
          <p>• Vert = faible • Orange = élevée • Rouge = critique</p>
        </aside>

        {/* Carte */}
        <div className="map">
          <MapContainer
            center={[-18.9, 47.5]}
            zoom={6}
            style={{ height: "72vh", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {showHeat && heatCircles}

            {showPoints &&
              SAMPLE_POINTS.map((p) => (
                <Marker key={p.id} position={p.position}>
                  <Popup>
                    <strong>{p.name}</strong>
                    <br />
                    Sévérité : {p.severity}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
