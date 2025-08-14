import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Alertes.css";

// Correction icônes Leaflet
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const alertesData = [
  {
    id: 1,
    titre: "Accumulation massive de plastique",
    gravite: "critique",
    region: "Antananarivo",
    coords: [-18.8792, 47.5079],
    date: "2025-08-10",
  },
  {
    id: 2,
    titre: "Déchets organiques non collectés",
    gravite: "élevée",
    region: "Toamasina",
    coords: [-18.1492, 49.4023],
    date: "2025-08-12",
  },
  {
    id: 3,
    titre: "Dépôt sauvage",
    gravite: "moyenne",
    region: "Fianarantsoa",
    coords: [-21.4536, 47.0857],
    date: "2025-08-14",
  },
];

export default function Alertes() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`alertes-container ${darkMode ? "dark" : "light"}`}>
      <div className="header">
        <h2>Alertes en cours</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Mode clair" : "Mode sombre"}
        </button>
      </div>

      <table className="alertes-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Gravité</th>
            <th>Région</th>
            <th>Date</th>
            <th>Carte</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alertesData.map((a) => (
            <tr key={a.id}>
              <td>{a.titre}</td>
              <td>
                <span className={`gravite ${a.gravite}`}>{a.gravite}</span>
              </td>
              <td>{a.region}</td>
              <td>{a.date}</td>
              <td>
                <div className="mini-map">
                  <MapContainer
                    center={a.coords}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={a.coords}>
                      <Popup>{a.titre}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </td>
              <td>
                <button className="btn-plan">Planifier action</button>
                <button className="btn-resolu">Marquer résolu</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
