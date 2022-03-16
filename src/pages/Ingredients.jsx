/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FetchAllIngredients, fetchByIngredient } from '../servicesAPI';

function Ingredients() {
  const location = useLocation();
  const page = location.pathname.split('/')[2];
  const type = page === 'foods' ? 'meals' : 'drinks';
  const [allIngredients, setAllIngredients] = useState([]);
  const { setRecipes } = useContext(MyContext);
  const getAllIngredients = async () => {
    const data = await FetchAllIngredients(page, type);
    setAllIngredients(data);
  };

  useEffect(() => {
    getAllIngredients();
  }, []);

  const handleClick = async (ingredient) => {
    const TWELVE = 12;
    const newRecipes = await fetchByIngredient(ingredient, page);
    setRecipes(newRecipes[type].slice(0, TWELVE));
  };

  return (
    <div>
      <Header
        title="Explore Ingredients"
      />
      <div className="cards-container">
        { allIngredients.map((ingredient, index) => (
          <div className="recipe-card" key={ index }>
            <Link
              to={ `/${page}` }
              onClick={ () => {
                handleClick(ingredient.strIngredient || ingredient.strIngredient1);
              } }
            >
              <div data-testid={ `${index}-ingredient-card` }>
                <p data-testid={ `${index}-card-name` }>
                  {ingredient.strIngredient
           || ingredient.strIngredient1}

                </p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={
                    `https://www.${page === 'foods' ? 'themealdb.com' : 'thecocktaildb.com'}/images/ingredients/${ingredient.strIngredient
                || ingredient.strIngredient1}-Small.png`
                  }
                  alt={ ingredient.strIngredient
                || ingredient.strIngredient1 }
                />

              </div>
            </Link>
          </div>

        ))}
      </div>

      <Footer />

    </div>
  );
}

export default Ingredients;
