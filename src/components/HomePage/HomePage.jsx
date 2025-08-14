import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login'); // Redirige vers la page /login
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>ecoMap Madagascar</h1>
          <p>
            Localisez, surveillez et agissez contre la pollution à Madagascar.
            Votre carte interactive pour un environnement plus propre.
          </p>
          <button className="cta-button" onClick={handleButtonClick}>
            Accéder à la carte
          </button>
        </div>
      </header>

      <section className="features-section">
        <h2>Nos fonctionnalités</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">📍</div>
            <h3>Localisation des déchets</h3>
            <p>
              Identifiez les décharges sauvages et les zones de pollution
              critiques en temps réel.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">📈</div>
            <h3>Analyse prédictive</h3>
            <p>
              Prédisez les futures zones à risque grâce à l'analyse des tendances
              saisonnières et des données.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">🔔</div>
            <h3>Alertes et actions</h3>
            <p>
              Recevez des alertes en temps réel et des recommandations pour agir
              proactivement.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">📣</div>
            <h3>Sensibilisation</h3>
            <p>
              Engagez-vous et sensibilisez la communauté et les autorités à
              travers l'application.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <p>&copy; 2025 ecoMap Madagascar. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HomePage;