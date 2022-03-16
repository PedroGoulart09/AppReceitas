import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiDrink } from 'react-icons/bi';
import { VscCompass } from 'react-icons/vsc';
import { GiKnifeFork } from 'react-icons/gi';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  const history = useHistory();

  const drinkRedirect = () => {
    history.push('/drinks');
  };

  const exploreRedirect = () => {
    history.push('/explore');
  };

  const foodRedirect = () => {
    history.push('/foods');
  };

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        type="button"
        src={ drinkIcon }
        onClick={ drinkRedirect }
      >
        <BiDrink />
      </button>

      <button
        type="button"
        src={ exploreIcon }
        onClick={ exploreRedirect }
      >
        <VscCompass />
      </button>

      <button
        type="button"
        src={ mealIcon }
        onClick={ foodRedirect }
      >
        <GiKnifeFork />

      </button>

    </footer>
  );
}

export default Footer;
