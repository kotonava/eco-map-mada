// src/pages/Summaries/Summaries.jsx
import React from "react";
import { FaFire, FaMapMarkedAlt, FaRegBell } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { perfectShape } from "../../utility";
import "./Summaries.css";

const Summaries = () => {
  // Les données pour les cartes du tableau de bord
  const kpis = [
    {
      title: "Zones à risques",
      value: "342",
      icon: FaFire,
      color: "var(--color-danger)",
    },
    {
      title: "Signalements actifs",
      value: "87",
      icon: BsPencilSquare,
      color: "var(--color-warning)",
    },
    {
      title: "Régions couvertes",
      value: "22",
      icon: FaMapMarkedAlt,
      color: "var(--primary)",
    },
    {
      title: "Tonnes estimées",
      value: "1,245",
      icon: FaRegBell,
      color: "var(--color-success)",
    },
  ];

  return (
    <section className="summaries">
      <div className="spotlight" />

      {kpis.map((kpi, index) => (
        <div className="card summary" key={index}>
          <div className="top">
            <div>
              <h2 className="title">{kpi.value}</h2>
              <p className="muted">{kpi.title}</p>
            </div>
            <div
              className="icon"
              style={{
                ...perfectShape(40, 40),
                background: `rgba(${kpi.color.replace('var(--','').slice(0, -1)}, 0.1)`,
                color: kpi.color,
              }}
            >
              <kpi.icon />
            </div>
          </div>
          <div className="bottom">
            {/* Vous pouvez ajouter une autre donnée ici si nécessaire,
            par exemple un pourcentage de changement. */}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Summaries;