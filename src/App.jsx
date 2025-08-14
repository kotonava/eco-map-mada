// // import Dashboard from "./Dashboard";
// import HomePage from "./components/HomePage/HomePage";
// function App() {
//   return <HomePage />;
// }

// export default App;

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './Dashboard';
import CarteHeatmap from './components/CarteHeatmap/CarteHeatmap';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CarteHeatmap" element={<CarteHeatmap />} />

        

        
      </Routes>
    </Router>
  );
}

export default App;