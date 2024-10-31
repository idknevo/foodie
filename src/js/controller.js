import icons from "url:../imgs/icons.svg";
import "../sass/main.scss";
import { metronome } from "ldrs";
import "regenerator-runtime/runtime"; // polyfilling async/await
import "core-js/stable"; // polyfilling everything else

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

const renderSpinner = function (parentEl) {
  metronome.register();
  const html = `
        <div class="spinner">
          <l-metronome
            size="60"
            stroke="5"
            speed="1" 
            color="#107e7d" 
          ></l-metronome>
        </div>`;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", html);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    renderSpinner(recipeContainer);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    if (!res.ok) throw new Error(`${data.message} , ${res.status}`);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      src: recipe.source_url,
      servings: recipe.servings,
      title: recipe.title,
    };
    // console.log(recipe);
    const html = `
        <figure class="recipe__figure">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <figcaption>
            <h1 class="recipe__title">
              <span>${recipe.title}</span>
            </h1>
          </figcaption>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <div class="recipe__info-data">
              <span class="recipe__info-number recipe__info-data--minutes"
                >${recipe.cookingTime}</span
              >
              <span class="recipe__info-text">Minutes</span>
            </div>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <div class="recipe__info-data">
              <span class="recipe__info-number recipe__info-data--people"
                >${recipe.servings}</span
              >
              <span class="recipe__info-text">Servings</span>
            </div>
          </div>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
          <div class="recipe__user">
            <div class="recipe__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
              <svg><use href="${icons}#icon-bookmark"></use></svg>
            </button>
          </div>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredients-list">
          ${recipe.ingredients
            .map((ing) => {
              return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
            })
            .join("")}
          </ul>
        </div>
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please
            check out directions at their website.
          </p>
          <a
            href="${recipe.src}"
            class="btn--small recipe__btn"
            target="_blank"
          >
            <span>Directions</span>
            <svg><use href="${icons}#icon-arrow-right"></use></svg>
          </a>
        </div>
        `;
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", html);
  } catch (err) {
    console.log(err.message);
  }
};
// showRecipe();
["hashchange", "load"].forEach((ev) => {
  window.addEventListener(ev, showRecipe);
});
// window.addEventListener("hashchange", showRecipe);
