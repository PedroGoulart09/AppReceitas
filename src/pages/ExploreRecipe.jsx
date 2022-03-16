import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandonDrink, fetchRandonFood } from '../servicesAPI/index';

function ExploreRecipe() {
  const history = useHistory();
  const pageTitle = history.location.pathname
    .split('/')[2];
  const surpriseFood = async () => {
    history.push(`/foods/${await fetchRandonFood()}`);
  };
  const surpriseDrink = async () => {
    history.push(`/drinks/${await fetchRandonDrink()}`);
  };

  return (
    <div>

      <Header title={ pageTitle === 'foods' ? 'Explore Foods' : 'Explore Drinks' } />
      <div>

        {pageTitle === 'drinks' ? (
          <div className="explore-container">
            <button
              data-testid="explore-by-ingredient"
              type="button"
              className="explore-btn"
              onClick={ () => history.push('/explore/drinks/ingredients') }
            >
              By Ingredient
            </button>

            <button
              data-testid="explore-surprise"
              type="button"
              className="explore-btn"
              onClick={ surpriseDrink }
            >
              Surprise me!
            </button>
          </div>
        )
          : (
            <div className="explore-container">
              <button
                data-testid="explore-by-ingredient"
                type="button"
                className="explore-btn"
                onClick={ () => history.push('/explore/foods/ingredients') }
              >
                By Ingredient
              </button>

              <button
                data-testid="explore-by-nationality"
                type="button"
                className="explore-btn"
                onClick={ () => history.push('/explore/foods/nationalities') }
              >
                By Nationality
              </button>

              <button
                data-testid="explore-surprise"
                type="button"
                className="explore-btn"
                onClick={ surpriseFood }
              >
                Surprise me!
              </button>
            </div>)}

      </div>

      <Footer />

    </div>
  );
}
export default ExploreRecipe;
