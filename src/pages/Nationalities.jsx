/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MyContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FecthAllNationalities, fetchMeal, FilterByNationalities } from '../servicesAPI';

function Nationalities() {
  const location = useLocation();
  const page = location.pathname.split('/')[3];
  const type = page === 'foods' && 'meals';
  const { setFoods, foods } = useContext(MyContext);
  const [allNationalities, setAllNationalities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState('All');
  const [cardsNationalities, setcardsNationalities] = useState([]);

  const getAllNationalities = async () => {
    const data = await FecthAllNationalities(page, type);
    setAllNationalities(data);
  };

  const getAllMeals = async () => {
    const defaultFoods = await fetchMeal();
    setFoods(defaultFoods);
    setcardsNationalities([]);
  };

  const getCardsNationalities = async (area) => {
    const DEFAULT_QTD = 12;
    const data = await FilterByNationalities(area);
    setcardsNationalities(data.slice(0, DEFAULT_QTD));
  };

  const handleChange = ({ target: { value } }) => {
    setSelectedNationality(value);
    if (value !== 'All') {
      getCardsNationalities(value);
    } else { getAllMeals(); }
  };

  useEffect(() => {
    getAllNationalities();
    console.log(cardsNationalities);
  }, [selectedNationality]);

  useEffect(() => {
    getAllMeals();
  }, []);

  const render = cardsNationalities.length > 0 ? cardsNationalities : foods;
  return (
    <div>
      <Header title="Explore Nationalities" isSearchButton />

      <div className="nationality-container">
        <select
          style={ { marginTop: '20px' } }
          data-testid="explore-by-nationality-dropdown"
          value={ selectedNationality }
          onChange={ handleChange }
        >
          <option data-testid="All-option">All</option>
          {allNationalities.map((nationalities, index) => (
            <option
              key={ index }
              data-testid={ `${nationalities.strArea}-option` }
            >
              {nationalities.strArea}
            </option>
          ))}
        </select>
        { render
          ? (render.map((card, index) => (
            <Link key={ card.idMeal } to={ `/foods/${card.idMeal}` }>
              <div data-testid={ `${index}-recipe-card` }>
                <h3 data-testid={ `${index}-card-name` }>{card.strMeal}</h3>
                <img
                  data-testid={ `${index}-card-img` }
                  style={ { width: '300px' } }
                  src={ card.strMealThumb }
                  alt="card"
                />
              </div>
            </Link>
          ))) : ''}
      </div>

      <Footer />
    </div>
  );
}

export default Nationalities;
