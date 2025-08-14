// src/components/WasteTypesChart/WasteTypesChart.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './WasteTypesChart.css';

const wasteTypes = [
  { type: 'Plastique', tons: 450 },
  { type: 'Verre', tons: 200 },
  { type: 'Papier', tons: 350 },
  { type: 'Organique', tons: 500 },
];

const WasteTypesChart = () => {
  return (
    <div className="chart-card">
      <h4 className="chart-title">Types de déchets (t)</h4>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={wasteTypes} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="type" stroke="rgb(var(--text-muted))" />
          <YAxis stroke="rgb(var(--text-muted))" />
          <Tooltip />
          <Bar dataKey="tons" barSize={18} fill="rgb(var(--color-success))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteTypesChart;