/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MyContext from '../../context/index';
import { fetchCategoryMeal,
  fetchMeal, fetchSelectCategoryMeals } from '../../servicesAPI';
import './Foods.css';

function Foods() {
  const { recipes, foods, setFoods } = useContext(MyContext);
  const [isFilter, setIsFilter] = useState(true);
  const [categorySelect, setCategorySelect] = useState('');
  const [categoryFoods, setCategoryFoods] = useState([]);

  const getFoods = async () => {
    setFoods(await fetchMeal());
    setCategoryFoods(await fetchCategoryMeal());
  };

  useEffect(() => {
    getFoods();
  }, []);

  const selectCategory = async ({ target: { innerText } }) => {
    setCategorySelect(innerText);
    if (innerText === categorySelect) {
      if (isFilter) {
        setFoods(await fetchSelectCategoryMeals(innerText));
      } else setFoods(await fetchMeal());
      setIsFilter(!isFilter);
    } else {
      setFoods(await fetchSelectCategoryMeals(innerText));
      setIsFilter(!isFilter);
    }
  };

  const allCategory = async () => {
    setFoods(await fetchMeal());
    setIsFilter(true);
    setCategorySelect('');
  };

  const render = recipes.length > 0 ? recipes : foods;
  return (
    <div>
      <Header isSearchButton title="Foods" />
      <div
        className="category-container"
      >
        {categoryFoods.length > 0 && categoryFoods.map((category, index) => (
          <div key={ index }>
            <button
              type="button"
              onClick={ selectCategory }
              data-testid={ `${category}-category-filter` }
            >
              {category}
            </button>
          </div>
        )) }

        <button
          data-testid="All-category-filter"
          onClick={ allCategory }
          type="button"
        >
          All

        </button>
      </div>
      <section
        className="cards-container"
      >
        {foods.length > 0 && render.map((value, index) => (
          <div
            key={ index }
            className="recipe-card"
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/foods/${value.idMeal}` }>
              <img
                src={ value.strMealThumb }
                alt="strMealThumb"
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{value.strMeal}</h3>
            </Link>
          </div>
        ))}
      </section>
      <Footer />

    </div>
  );
}

export default Foods;
