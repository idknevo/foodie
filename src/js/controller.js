import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
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
    // update active recipe
    resultsView.update(model.getResultsPerPage());
    bookmarksView.update(model.state.bookmarks);
    // console.log(recipe);
  } catch (err) {
    recipeView.renderError(err.message);
    // console.log(err);
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
    resultsView.renderError(err.message);
    // console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getResultsPerPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
  // console.log("message");
  // console.log(model.state.recipe);
};

const controlAddbookmark = function () {
  // add bookmars
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe);
  }
  // update recipe view
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
  //render bookmarks view
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.renderMessage();
  bookmarksView.renderError();
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddbookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
