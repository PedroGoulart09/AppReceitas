import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const logoutBtn = () => {
    localStorage.clear();
    history.push('/');
  };

  const getEmail = JSON.parse(localStorage.getItem('user')) !== null
    ? JSON.parse(localStorage.getItem('user')).email
    : 'você não está logado';

  return (
    <div>

      <Header title="Profile" isSearchButton={ false } />

      <div className="explore-container">
        <p
          data-testid="profile-email"
        >
          { getEmail }
        </p>

        <button
          data-testid="profile-done-btn"
          type="button"
          className="explore-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          type="button"
          className="explore-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          type="button"
          className="explore-btn"
          onClick={ logoutBtn }
        >
          Logout
        </button>

        <Footer />

      </div>
    </div>
  );
}

export default Profile;
