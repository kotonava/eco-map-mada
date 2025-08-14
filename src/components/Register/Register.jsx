import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Créez ce fichier CSS

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'inscription ici
    // Exemple : si l'inscription réussit, rediriger vers la page de connexion
    // navigate('/login');
    alert('Logique d\'inscription à implémenter !');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo">🌱</div>
        <h2>Créer un compte</h2>
        <p>Rejoignez la communauté ecoMap Madagascar !</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </div>
          <button type="submit" className="register-button">
            S'inscrire
          </button>
        </form>
        <div className="register-footer">
          <p>
            Vous avez déjà un compte ?{' '}
            <a href="#" onClick={() => navigate('/login')}>
              Connectez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;