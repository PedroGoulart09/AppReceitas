/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import { fetchDrinkDetails, fetchMealDetails, filterIngredients, getRecomended,
} from '../../servicesAPI';
import RecipeInfo from '../../components/RecipeInfo';
import MyContext from '../../context';
import VideoCard from '../../components/Video';
import Recomended from '../../components/Recomended';
import './recipeDetails.css';

function RecipeDetails() {
  const { details,
    setDetails,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
    recomended,
    setRecomended } = useContext(MyContext);

  const { location: { pathname }, push } = useHistory();
  const typeDrink = pathname.split('/')[1] === 'drinks';
  const type = typeDrink ? 'cocktails' : 'meals';
  const getDetails = async (id) => {
    const data = typeDrink
      ? await fetchDrinkDetails(id)
      : await fetchMealDetails(id);

    setDetails(data[0]);
  };

  const redirectProgress = () => {
    push(`/${pathname.split('/')[1]}/${
      pathname.split('/')[2]}/in-progress`);
  };
  const id = pathname.split('/')[2];

  const addRecipe = () => {
    const storage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: [], cocktails: [] };
    console.log(storage);
    if (!storage[type][id]) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ ...storage, [type]: { ...storage[type], [id]: [] } }));
    }
  };

  const validProgress = () => {
    const storage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: [], cocktails: [] };
    return storage[type][id];
  };

  const validDoneRecipe = () => {
    const storage = JSON.parse(localStorage
      .getItem('doneRecipes'));
    if (storage) return storage.some(({ id: idRecipe }) => idRecipe === id);
    return false;
  };

  const handleClick = () => {
    addRecipe();
    redirectProgress();
  };

  useEffect(() => {
    const SIX = 6;
    getDetails(pathname.split('/')[2]);
    getRecomended(SIX, pathname, setRecomended);
  }, []);

  useEffect(() => {
    setIngredients(filterIngredients(details, 'strIngredient'));
    setMeasures(filterIngredients(details, 'strMeasure'));
  }, [details]);

  const recipeInfo = {
    details,
    typeDrink,
    ingredients,
    pathname,
    measures,
    id,
  };
  const page = pathname;
  return (
    page.includes('in-progress')
      ? (
        <RecipeInfo recipeInfo={ recipeInfo } page="in-progress" />
      ) : (
        <div>
          <RecipeInfo recipeInfo={ recipeInfo } page="details" />
          {!typeDrink && (
            <VideoCard details={ details } />
          )}
          <h3>Recomended:</h3>
          <div className="recomended-container">

            {recomended.map((recipe, index) => (
              <Recomended
                key={ index }
                recipe={ recipe }
                index={ index }
                typeDrink={ typeDrink }
              />

            ))}
          </div>
          {!validDoneRecipe()
          && (
            <div>
              {!validProgress()
                ? (
                  <button
                    style={ { position: 'fixed', bottom: '0' } }
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ handleClick }
                    className="start-btn"
                  >
                    Start Recipe
                  </button>)

                : (
                  <button
                    style={ { position: 'fixed', bottom: '0' } }
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ handleClick }
                    className="start-btn"
                  >
                    Continue Recipe
                  </button>)}
            </div>)}
        </div>)
  );
}

export default RecipeDetails;
