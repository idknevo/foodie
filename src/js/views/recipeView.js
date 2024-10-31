import icons from "url:../../imgs/icons.svg";
import Fraction from "fraction.js";
import { metronome } from "ldrs";

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;

  render(data) {
    this.#data = data;
    this.#clear();
    const html = this.#generateHtml();
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #generateHtml() {
    return `
        <figure class="recipe__figure">
          <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
          <figcaption>
            <h1 class="recipe__title">
              <span>${this.#data.title}</span>
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
                >${this.#data.cookingTime}</span
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
                >${this.#data.servings}</span
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
          ${this.#data.ingredients
            .map((ing) => this.#generateIngredientHtml(ing))
            .join("")}
          </ul>
        </div>
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please
            check out directions at their website.
          </p>
          <a
            href="${this.#data.src}"
            class="btn--small recipe__btn"
            target="_blank"
          >
            <span>Directions</span>
            <svg><use href="${icons}#icon-arrow-right"></use></svg>
          </a>
        </div>
        `;
  }

  renderSpinner() {
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
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  }

  #generateIngredientHtml(ing) {
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
