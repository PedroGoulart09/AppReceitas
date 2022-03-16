/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context';

function ProgressInpunt({ ingredient, index, id, pathname, enableBtn }) {
  const { measures } = useContext(MyContext);
  const type = pathname === 'foods' ? 'meals' : 'cocktails';
  const getCurrentStorage = () => JSON.parse(localStorage.getItem('inProgressRecipes'));
  const transtionStorage = getCurrentStorage();
  const validCheck = transtionStorage !== null
  && transtionStorage[type][id].includes(ingredient[1]);
  const [isChecked, setIsChecked] = useState(validCheck);

  const setStorage = () => {
    if (getCurrentStorage() === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ [type]: { [id]: [] } }));
    }
  };

  const addIngredient = (storage) => {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify(
        { ...storage,
          [type]: { ...storage[type],
            [id]: [...storage[type][id], ingredient[1]] } },
      ));
  };

  const removeIngredient = (storage) => {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify(
        { ...storage,
          [type]: { ...storage[type],
            [id]:
         [...storage[type][id]
           .filter((ingred) => ingred !== ingredient[1])] } },
      ));
  };
  const handleChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      addIngredient(getCurrentStorage());
    } else {
      removeIngredient(getCurrentStorage());
    }
    enableBtn();
  };

  const validChecks = () => {
    setIsChecked();
  };

  useEffect(() => {
    validChecks();
    setStorage();
  }, []);

  return (
    <div>
      <label
        className={ validCheck ? 'checked' : '' }
        htmlFor={ index }
        data-testid={ `${index}-ingredient-step` }

      >
        <input
          id={ index }
          type="checkbox"
          checked={ isChecked }
          onChange={ handleChange }

        />
        {ingredient[1]}
        {''}
        {measures[index][1]}

      </label>

    </div>

  );
}

ProgressInpunt.propTypes = {
  id: PropTypes.string.isRequired,
  ingredient: PropTypes.arrayOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  enableBtn: PropTypes.func.isRequired,

};

export default ProgressInpunt;
