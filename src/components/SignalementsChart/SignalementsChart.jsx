// src/components/SignalementsChart/SignalementsChart.jsx

import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './SignalementsChart.css';

const timeSeries = [
  { week: 'Sem-1', reports: 5 },
  { week: 'Sem-2', reports: 8 },
  { week: 'Sem-3', reports: 15 },
  { week: 'Sem-4', reports: 12 },
  { week: 'Sem-5', reports: 20 },
  { week: 'Sem-6', reports: 18 },
  { week: 'Sem-7', reports: 25 },
];

const SignalementsChart = () => {
  return (
    <div className="chart-card">
      <h4 className="chart-title">Signalements — dernières semaines</h4>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={timeSeries} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="week" stroke="rgb(var(--text-muted))" />
          <Tooltip />
          <Area type="monotone" dataKey="reports" stroke="rgb(var(--primary))" fillOpacity={0.2} fill="rgb(var(--primary))" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignalementsChart;