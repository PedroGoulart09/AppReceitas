import PropTypes from 'prop-types';
import React from 'react';
import './Recomended.css';

function Recomended({ index, recipe }) {
  return (
    <div
      key={ index }
      className="recomended-card"
      data-testid={ `${index}-recomendation-card` }
    >
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="recipe pic"
      />
      <h3
        data-testid={ `${index}-recomendation-title` }
      >
        {recipe.strMeal || recipe.strDrink}

      </h3>

    </div>
  );
}

Recomended.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default Recomended;
