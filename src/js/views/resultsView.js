import View from "./view";
import icons from "url:../../imgs/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _message = "";
  _errorMessage = "No recipe found for your query! Please try again.";

  _generateHtml() {
    // console.log(this._data);
    return this._data.map(this._generatePreviewHtml).join("");
  }

  _generatePreviewHtml(result) {
    const id = window.location.hash.slice(1);
    return `
          <li class="preview">
            <a href="#${result.id}" class="preview__link ${
      result.id === id ? "preview__link--active" : ""
    }">
              <figure class="preview__figure">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">
                  ${result.title}
                </h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultsView();
