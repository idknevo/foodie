import View from "./view";
import preview from "./preview.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _message = "";
  _errorMessage = "No recipe found for your query! Please try again.";

  _generateHtml() {
    console.log(this._data);
    return this._data.map((result) => preview._generateHtml(result)).join("");
  }
}

export default new ResultsView();
