import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      src: recipe.source_url,
      servings: recipe.servings,
      title: recipe.title,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.page = 1;
    // console.log(state.search);
  } catch (err) {
    throw err;
  }
};

export const getResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // console.log(state.recipe);
  // console.log(state.recipe.ingredients);
  state.recipe.ingredients.map((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const saveBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const updateBookmarks = function () {
  const storageData = localStorage.getItem("bookmarks");
  // console.log(JSON.parse(storageData));
  if (storageData) state.bookmarks = JSON.parse(storageData);
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);
  // console.log(state.bookmarks);
  // mark recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // console.log(state.bookmarks);
  saveBookmarks();
};

export const deleteBookmark = function (recipe) {
  // delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === recipe.id);
  // console.log(state.bookmarks);
  // console.log(index);
  state.bookmarks.splice(index, 1);
  // mark recipe as not bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  // console.log(state.bookmarks);
  saveBookmarks();
};

export const clearBookmarks = function () {
  // localStorage.clear("bookmarks");
  state.bookmarks.forEach((recipe) => (recipe.bookmarked = false));
  state.bookmarks = [];
  state.recipe.bookmarked = false;
  saveBookmarks();
};
