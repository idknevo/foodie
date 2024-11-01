import icons from "url:../../imgs/icons.svg";
import Fraction from "fraction.js";
import View from "./view.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _message = `Start by searching for a recipe or ingredient. Have fun!`;
  _errorMessage = `Couldn't find this recipe, try another one!`;

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  _generateHtml() {
    return `
        <figure class="recipe__figure">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <figcaption>
            <h1 class="recipe__title">
              <span>${this._data.title}</span>
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
                >${this._data.cookingTime}</span
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
                >${this._data.servings}</span
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
            <button class="btn--round">
              <svg><use href="${icons}#icon-bookmark"></use></svg>
            </button>
          </div>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredients-list">
          ${this._data.ingredients
            .map((ing) => this._generateIngredientHtml(ing))
            .join("")}
          </ul>
        </div>
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please
            check out directions at their website.
          </p>
          <a
            href="${this._data.src}"
            class="btn--small recipe__btn"
            target="_blank"
          >
            <span>Directions</span>
            <svg><use href="${icons}#icon-arrow-right"></use></svg>
          </a>
        </div>
        `;
  }

  _generateIngredientHtml(ing) {
    return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ""
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
  }
}

export default new RecipeView();
