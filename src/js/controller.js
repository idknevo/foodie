import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "../sass/main.scss";
import "regenerator-runtime/runtime"; // polyfilling async/await
import "core-js/stable"; // polyfilling everything else

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

const showRecipe = async function () {
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
    console.log(err.message);
  }
};
// showRecipe();
["hashchange", "load"].forEach((ev) => {
  window.addEventListener(ev, showRecipe);
});
// window.addEventListener("hashchange", showRecipe);
