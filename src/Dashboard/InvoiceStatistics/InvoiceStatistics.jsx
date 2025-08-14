// src/pages/Dashboard/InvoiceStatistics/InvoiceStatistics.jsx

import React from 'react';
import './InvoiceStatistics.css';

const alerts = [
  {
    type: "Critique",
    message: "Hotspot critique: Analakely — action requise",
    color: "var(--color-warning)", // Utilisez une variable CSS pour la couleur
  },
  {
    type: "Moyen",
    message: "Accumulation près du port Toamasina — planifier collecte",
    color: "var(--color-danger)", // Utilisez une variable CSS pour la couleur
  },
  {
    type: "Faible",
    message: "Niveau de remplissage élevé: Antsirabe — surveiller",
    color: "rgb(var(--primary))", // Utilisez une variable CSS pour la couleur
  },
];

const AlertesCard = () => {
  const pendingReports = alerts.length;

  const BellIcon = ({ style }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="bell-icon" 
      style={style} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.51V13a6 6 0 00-6-6H9a6 6 0 00-6 6v1.51c0 .656-.254 1.284-.707 1.748L1 17h5m0-1v-2a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h6m-3-11v-1a1 1 0 011-1h2a1 1 0 011 1v1M12 20a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  );

  return (
    <div className="card alertes-card">
      <div className="top">
        <h2 className="title">Alertes</h2>
        <div className="alertes-pending">{pendingReports} en attente</div>
      </div>
      <ul className="alerts-list">
        {alerts.map((alert, index) => (
          <li key={index} className="alert-item">
            <BellIcon style={{ color: alert.color }} />
            <span className="alert-message" style={{ color: alert.color }}>{alert.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertesCard;