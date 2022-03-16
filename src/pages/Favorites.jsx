import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { copyUrl } from '../servicesAPI';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isShowCopied, setIsShowCopied] = useState(false);
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  const attFavorites = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorites(storage);
  };

  const filterByType = ({ target }) => {
    const data = favorites.filter((recipe) => (recipe.type === target.name));
    setFilteredFavorites(data);
  };

  const filterAll = () => {
    setFilteredFavorites(favorites);
  };

  useEffect(() => {
    attFavorites();
  }, []);

  const handleCopy = (typeDrink, pathname) => {
    copy(copyUrl(typeDrink, pathname));
    setIsShowCopied(true);
  };

  const removeFavoriteStorage = (recipeId) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...storage.filter((item) => item.id
        !== recipeId)]));
    attFavorites();
  };

  const renderr = filteredFavorites.length > 0 ? filteredFavorites : favorites;
  return (
    <div>
      <Header title="Favorite Recipes" />
      <div className="container-done-recipes">
        <div className="category-container">
          <button
            className="explore-btn"
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ filterAll }
          >
            All

          </button>
          <button
            className="explore-btn"
            data-testid="filter-by-food-btn"
            type="button"
            name="food"
            onClick={ filterByType }

          >
            Foods

          </button>
          <button
            className="explore-btn"
            data-testid="filter-by-drink-btn"
            type="button"
            name="drink"
            onClick={ filterByType }
          >
            Drinks

          </button>
        </div>
        <section>
          {
            renderr.map((recipe, index) => {
              const typeFood = recipe.type === 'food';
              const pathName = typeFood ? `/foods/${recipe.id}` : `/drinks/${recipe.id}`;

              return (
                <div key={ index }>
                  <Link to={ pathName }>
                    <img
                      style={ { width: '300px' } }
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.id }
                    />
                    <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>

                    {recipe.nationality}
                    {' - '}
                    {recipe.alcoholicOrNot
                    !== '' ? recipe.alcoholicOrNot : recipe.category}
                  </p>
                  <button
                    data-testid="share-btn"
                    type="button"
                    onClick={ () => handleCopy(typeFood, pathName) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share-btn"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ () => removeFavoriteStorage(recipe.id) }
                  >
                    <img
                      alt="favorite-btn"
                      src={ blackHeartIcon }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                  {
                    isShowCopied && <p>Link copied!</p>
                  }

                </div>
              );
            })
          }
        </section>

      </div>
    </div>
  );
}

export default Favorites;
