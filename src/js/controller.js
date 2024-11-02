import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import "../sass/main.scss";
import "regenerator-runtime/runtime"; // polyfilling async/await
import "core-js/stable"; // polyfilling everything else

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    // load recipe
    await model.loadRecipe(id);
    // render recipe
    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // get search query
    const query = searchView.getQuery();
    if (!query) return;
    // load search results for query
    await model.loadSearchResults(query);
    // render search results
    // console.log(model.state.search);
    resultsView.render(model.getResultsPerPage());
    // render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getResultsPerPage(goToPage));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.renderMessage();
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
