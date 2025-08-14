import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Rediriger vers la page du tableau de bord
    navigate('/dashboard'); 
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">🌱</div>
        <h2>Connexion</h2>
        <p>Connectez-vous pour accéder à ecoMap Madagascar.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
        <div className="login-footer">
          <a href="#">Mot de passe oublié ?</a>
          <span> • </span>
          <a href="#" onClick={() => navigate('/register')}>
            Créer un compte
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;