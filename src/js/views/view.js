import icons from "url:../../imgs/icons.svg";
import { metronome } from "ldrs";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    this._clear();
    const html = this._generateHtml();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _clear() {
    this._parentElement.innerHTML = "";
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

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderMessage(message = this._message) {
    const html = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderError(message = this._errorMessage) {
    const html = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}
