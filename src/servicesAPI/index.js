const DEFAULT_QTD = 12;
const FIVE = 5;

export const fetchByIngredient = async (ingredient, page) => {
  const INGREDIENTS_URL = page === 'foods' ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const data = await (await fetch(INGREDIENTS_URL)).json();
  console.log(data);
  console.log(INGREDIENTS_URL);

  return data;
};
export const fetchByName = async (name, page) => {
  const NAME_URL = page === 'foods' ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const data = await (await fetch(NAME_URL)).json();

  return data;
};
export const fetchFirstLetter = async (firstLetter, page) => {
  const LETTER_URL = page === 'foods' ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const data = await (await fetch(LETTER_URL)).json();

  return data;
};
export const fetchDrinks = async (qtd = DEFAULT_QTD) => {
  const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await (await fetch(DRINKS_URL)).json();
  const newData = drinks.slice(0, qtd);

  return newData;
};
export const fetchMeal = async (qtd = DEFAULT_QTD) => {
  const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await (await fetch(MEAL_URL)).json();
  const newData = meals.slice(0, qtd);
  return newData;
};
export const fetchDrinkDetails = async (id) => {
  const DETAILS_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks } = await (await fetch(DETAILS_URL)).json();
  return drinks;
};
export const fetchMealDetails = async (id) => {
  const DETAILS_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await (await fetch(DETAILS_URL)).json();
  return meals;
};
export const fetchCategoryMeal = async () => {
  const CATEGORY_MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals } = await (await fetch(CATEGORY_MEALS_URL)).json();
  const newData = meals.slice(0, FIVE);
  return newData.map((e) => e.strCategory);
};
export const fetchCategoryDrinks = async () => {
  const CATEGORY_DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks } = await (await fetch(CATEGORY_DRINKS_URL)).json();
  const newData = drinks.slice(0, FIVE);
  return newData.map((e) => e.strCategory);
};
export const fetchSelectCategoryDrinks = async (category) => {
  const SELECT_CATEGORY_DRINKS_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const { drinks } = await (await fetch(SELECT_CATEGORY_DRINKS_URL)).json();
  const newData = drinks.slice(0, DEFAULT_QTD);
  return newData;
};
export const fetchSelectCategoryMeals = async (category) => {
  const SELECT_CATEGORY_MEALS_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const { meals } = await (await fetch(SELECT_CATEGORY_MEALS_URL)).json();
  const newData = meals.slice(0, DEFAULT_QTD);
  return newData;
};

export const fetchRandonFood = async () => {
  const RANDON_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const { meals } = await (await fetch(RANDON_MEAL_URL)).json();
  console.log(meals[0].idMeal);
  return meals[0].idMeal;
};

export const fetchRandonDrink = async () => {
  const RANDON_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const { drinks } = await (await fetch(RANDON_DRINK_URL)).json();
  console.log(drinks);
  return drinks[0].idDrink;
};

export const filterIngredients = (array, param) => Object
  .entries(array).filter((ingredients) => ingredients[0]
    .includes(param));

export const filters = {
  inputIngredient: fetchByIngredient,
  inputName: fetchByName,
  inputLetter: fetchFirstLetter,
};

export const copyUrl = (typeDrink, pathname) => {
  const LENGTHDRINKS = 14;
  const LENGTHFOODS = 12;

  const URL = typeDrink ? `http://localhost:3000${pathname.substr(0, LENGTHDRINKS)}`
    : `http://localhost:3000${pathname.substr(0, LENGTHFOODS)}`;
  return URL;
};

export const getRecomended = async (qtd, pathname, setter) => {
  const data = pathname.split('/')[1] === 'drinks'
    ? await fetchMeal(qtd)
    : await fetchDrinks(qtd);
  setter(data);
};

export const FetchAllIngredients = async (page, type) => {
  const URL = page === 'foods' ? 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const data = await (await fetch(URL)).json();
  const newData = data[type].slice(0, DEFAULT_QTD);
  return newData;
};

export const setFavorite = (details, typeDrink) => {
  const favorites = {
    id: details[typeDrink ? 'idDrink' : 'idMeal'],
    type: typeDrink ? 'drink' : 'food',
    nationality: details.strArea || '',
    category: details.strCategory || '',
    alcoholicOrNot: details.strAlcoholic || '',
    name: details.strDrink || details.strMeal,
    image: details.strDrinkThumb || details.strMealThumb,
  };

  return favorites;
};

export const setDoneRecipes = (details, typeDrink) => {
  const doneRecipe = {
    id: details[typeDrink ? 'idDrink' : 'idMeal'],
    type: typeDrink ? 'drink' : 'food',
    nationality: details.strArea || '',
    category: details.strCategory || '',
    alcoholicOrNot: details.strAlcoholic || '',
    name: details.strDrink || details.strMeal,
    image: details.strDrinkThumb || details.strMealThumb,
    doneDate: new Date().toISOString(),
    tags: details.strTags !== null ? details.strTags.split(',') : [''],

  };
  return doneRecipe;
};

export const FecthAllNationalities = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { meals } = await (await fetch(URL)).json();
  return meals;
};

export const FilterByNationalities = async (country) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`;
  const { meals } = await (await fetch(URL)).json();
  return meals;
};
