// src/components/HotspotsTable/HotspotsTable.jsx

import React from 'react';
import './HotspotsTable.css';

const hotspots = [
  { id: 1, name: 'Analakely', region: 'Antananarivo', severity: 'Critique', estTons: 15.2, lastReport: 'Il y a 2h' },
  { id: 2, name: 'Port Toamasina', region: 'Toamasina', severity: 'Élevée', estTons: 22.5, lastReport: 'Il y a 5h' },
  { id: 3, name: 'Parc Tsarasaotra', region: 'Antananarivo', severity: 'Moyenne', estTons: 7.8, lastReport: 'Hier' },
  { id: 4, name: 'Quartier Mahamasina', region: 'Antananarivo', severity: 'Faible', estTons: 3.1, lastReport: 'Il y a 3 jours' },
  { id: 5, name: 'Marché d’Anosibe', region: 'Antananarivo', severity: 'Élevée', estTons: 18.9, lastReport: 'Il y a 10h' },
];

const HotspotsTable = () => {
  return (
    <section className="hotspots-card">
      <h3 className="card-title">Principaux hotspots</h3>
      <div className="table-wrapper">
        <table className="hotspots-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Région</th>
              <th>Sévérité</th>
              <th>Est. (t)</th>
              <th>Dernier signalement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotspots.map((h, index) => (
              <tr key={h.id} className={index % 2 === 0 ? "even-row" : ""}>
                <td>{h.id}</td>
                <td>{h.name}</td>
                <td>{h.region}</td>
                <td className={`severity-${h.severity.toLowerCase()}`}>{h.severity}</td>
                <td>{h.estTons}</td>
                <td>{h.lastReport}</td>
                <td>
                  <div className="action-buttons">
                    <button className="button-view">Voir</button>
                    <button className="button-alert">Alerter</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HotspotsTable;