// src/pages/Dashboard/Dashboard.jsx

import React from "react";
import Wrapper from "../components/Wrapper/Wrapper";
import Summaries from "./Summaries/Summaries";
import InvoiceStatistics from "./InvoiceStatistics/InvoiceStatistics";
import BestSelling from "./BestSelling/BestSelling";
import Map from "../components/Map/Map";
import SignalementsChart from '../components/SignalementsChart/SignalementsChart'; // Importez le nouveau composant
import WasteTypesChart from '../components/WasteTypesChart/WasteTypesChart'; // Importez le nouveau composant
import "./Dashboard.css";
import HotspotsTable from "./HotspotsTable/HotspotsTable";

const Dashboard = () => {
  return (
    <Wrapper>
      <Summaries />
      <section className="revenue-grid">
        <div className="spotlight" />
        <Map />
        <InvoiceStatistics />
      </section>
      
      {/* Nouvelle section pour les graphiques */}
      <section className="charts-grid">
        <SignalementsChart />
        <WasteTypesChart />
      </section>

      <HotspotsTable />
    </Wrapper>
  );
};

export default Dashboard;