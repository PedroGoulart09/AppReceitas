import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { copyUrl } from '../servicesAPI';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isShowCopied, setIsShowCopied] = useState(false);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  const attDoneRecipes = () => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(storage);
  };

  const filterByType = ({ target }) => {
    const data = doneRecipes.filter((recipe) => (recipe.type === target.name));
    setFilteredDoneRecipes(data);
  };

  const filterAll = () => {
    setFilteredDoneRecipes(doneRecipes);
  };

  useEffect(() => {
    attDoneRecipes();
  }, []);

  const handleCopy = (typeDrink, pathname) => {
    copy(copyUrl(typeDrink, pathname));
    setIsShowCopied(true);
  };

  const render = filteredDoneRecipes.length > 0 ? filteredDoneRecipes : doneRecipes;
  return (
    <div>

      <Header title="Done Recipes" />

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
            data-testid="filter-by-food-btn"
            type="button"
            className="explore-btn"
            name="food"
            onClick={ filterByType }

          >
            Foods

          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            name="drink"
            className="explore-btn"
            onClick={ filterByType }
          >
            Drinks

          </button>
        </div>
        <section>
          {
            render.map((recipe, index) => {
              const typeFood = recipe.type === 'food';
              const pathName = typeFood ? `/foods/${recipe.id}` : `/drinks/${recipe.id}`;
              console.log(typeof recipe.tags);

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
                  <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
                  {
                    recipe.tags.map((tag) => (
                      <p
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}

                      </p>
                    ))
                  }
                  <button
                    data-testid="share-btn"
                    type="button"
                    className="share-btn"
                    onClick={ () => handleCopy(typeFood, pathName) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share-btn"
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

export default DoneRecipes;
