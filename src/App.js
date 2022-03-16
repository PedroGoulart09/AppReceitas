import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import Explore from './pages/Explore';
import ExploreRecipe from './pages/ExploreRecipe';
import Ingredients from './pages/Ingredients';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Favorites from './pages/Favorites';
import Nationalities from './pages/Nationalities';
import NotFound from './pages/NotFound';
import '@picocss/pico';

function App() {
  return (
    <Switch>
      <RecipesProvider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/foods/:id/in-progress" component={ RecipeDetails } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeDetails } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreRecipe } />
        <Route exact path="/explore/drinks" component={ ExploreRecipe } />
        <Route exact path="/explore/foods/ingredients" component={ Ingredients } />
        <Route exact path="/explore/drinks/ingredients" component={ Ingredients } />
        <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/explore/drinks/nationalities" component={ NotFound } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ Favorites } />
      </RecipesProvider>
    </Switch>
  );
}

export default App;
