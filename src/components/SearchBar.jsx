import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { filters } from '../servicesAPI';
import MyContext from '../context';

export default function SearchBar() {
  const { filterRadio, searchInput, setFilterRadio, setSearchInput, setRecipes,
  } = useContext(MyContext);
  const TWELVE = 12;
  const history = useHistory();
  const { location } = history;
  const page = location.pathname.split('/')[1];
  const type = page === 'foods' ? 'meals' : 'drinks';

  const handleClick = async () => {
    if (searchInput.length > 1 && filterRadio === 'inputLetter') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const data = await filters[filterRadio](searchInput, page);
      if (data[type] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else
      if (data[type].length === 1) {
        const URL = page === 'foods' ? (`./foods/${data.meals[0].idMeal}`) : (
          `./drinks/${data.drinks[0].idDrink}`);
        history.push(URL);
      } else {
        setRecipes(data[type].slice(0, TWELVE));
      }
    }
  };

  return (
    <div className="search-bar">
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Search Recipe"
          data-testid="search-input"
          value={ searchInput }
          onChange={ ({ target }) => {
            setSearchInput(target.value);
          } }
        />
        <div
          className="radio-inputs"
        >
          <label htmlFor="ingredient">

            <input
              name="filter"
              type="radio"
              id="ingredient"
              data-testid="ingredient-search-radio"
              value="inputIngredient"
              onChange={ () => { setFilterRadio('inputIngredient'); } }
            />
            ingredient
          </label>

          <label htmlFor="name">

            <input
              name="filter"
              type="radio"
              id="name"
              data-testid="name-search-radio"
              value="inputName"
              onChange={ () => { setFilterRadio('inputName'); } }
            />
            Name
          </label>

          <label htmlFor="firstLetter">

            <input
              name="filter"
              type="radio"
              id="firstLetter"
              data-testid="first-letter-search-radio"
              value="inputLetter"
              onChange={ () => { setFilterRadio('inputLetter'); } }
            />
            First Letter
          </label>
        </div>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search

        </button>

      </div>
    </div>
  );
}
