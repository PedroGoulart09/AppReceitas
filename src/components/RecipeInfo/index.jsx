/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProgressInpunt from '../ProgressInpunt';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './recipeInfo.css';
import shereIcon from '../../images/shareIcon.svg';

import { copyUrl, setDoneRecipes, setFavorite } from '../../servicesAPI';

function RecipeInfo({ recipeInfo: {
  typeDrink, details, ingredients, pathname, measures }, page }) {
  const [isEnableBtn, setIsEnableBtn] = useState();
  const [isShowCopied, setShowCopied] = useState(false);

  const id = pathname.split('/')[2];
  const storage1 = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const validStorage = storage1 !== null
  && storage1.some((favorite) => favorite.id === id);
  const [isFavorite, setIsFavorite] = useState(validStorage);

  const history = useHistory();
  const enableBtn = () => {
    const checkbox = document.querySelectorAll('input');
    const myArray = [...checkbox];
    setIsEnableBtn(myArray.every((input) => input.checked));
  };

  useEffect(() => {
    enableBtn();
    console.log(validStorage);
  }, []);

  const handleCopy = () => {
    copy(copyUrl(typeDrink, pathname));
    setShowCopied(true);
  };

  const handleClick = () => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON
      .stringify([...storage, setDoneRecipes(details, typeDrink)]));
    setIsEnableBtn(!isEnableBtn);
    history.push('/done-recipes');
  };

  const addFavoriteStorage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...storage, setFavorite(details, typeDrink)]));
    setIsFavorite(!isFavorite);
  };

  const removeFavoriteStorage = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...storage.filter((item) => item.id
        !== setFavorite(details, typeDrink).id)]));
    setIsFavorite(!isFavorite);
  };

  const handleClickFavorite = () => {
    if (!isFavorite) {
      addFavoriteStorage();
    } else {
      removeFavoriteStorage();
    }
  };

  return (

    <div
      className="recipe-info"
    >
      <img
        className="img-recipe"
        src={
          details.strDrinkThumb
             || details.strMealThumb
        }
        data-testid="recipe-photo"
        alt=""
      />
      <div
        className="recipe-title-container"
      >
        <h1
          data-testid="recipe-title"
          style={ { color: 'black' } }
        >
          { details.strDrink || details.strMeal}

        </h1>
        <div>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ handleCopy }
          >
            <img src={ shereIcon } alt="" srcSet="" />
          </button>
          <button
            type="button"
            onClick={ handleClickFavorite }
          >

            <img
              src={ isFavorite
                ? blackHeartIcon : whiteHeartIcon }
              alt=""
              data-testid="favorite-btn"
            />
          </button>
          {isShowCopied && <p>Link copied!</p>}
        </div>
      </div>

      <h5
        className="recipe-category"
        data-testid="recipe-category"
      >
        {details.strAlcoholic || details.strCategory}

      </h5>
      <div>
        <h3>Instructions:</h3>

        <span
          data-testid="instructions"
          className="instructions"
        >
          {details.strInstructions}

        </span>
      </div>
      <h3>Ingredients:</h3>
      <div className="ingredients-container">
        {page === 'details'
          ? (ingredients.map((ingredient, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient[0] }
            >
              {ingredient[1]}
              {''}
              {measures[index][1]}

            </p>
          ))

          )

          : (
            <div>
              {ingredients.filter((ingr) => ingr[1] !== null && ingr[1] !== '')
                .map((ingredient, index) => (
                  <ProgressInpunt
                    enableBtn={ enableBtn }
                    key={ index }
                    ingredient={ ingredient }
                    measures={ measures }
                    index={ index }
                    id={ pathname.split('/')[2] }
                    pathname={ pathname.split('/')[1] }
                  />
                ))}

              <button
                data-testid="finish-recipe-btn"
                type="button"
                disabled={ !isEnableBtn }
                onClick={ handleClick }
                className="start-btn"
              >
                Finish Recipe

              </button>
            </div>

          )}
      </div>

    </div>
  );
}

RecipeInfo.propTypes = {
  recipeInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  page: PropTypes.string.isRequired,
};
export default RecipeInfo;
