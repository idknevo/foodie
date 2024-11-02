import icons from "url:../../imgs/icons.svg";
import View from "./view";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      // console.log(goTo);
      handler(goTo);
    });
  }

  _generateHtml() {
    // console.log(this._data);
    const currentPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numOfPages);

    // page 1 && there are other pages
    if (currentPage === 1 && numOfPages > 1) {
      return [
        this._generatePagesCountHtml(numOfPages),
        this._generateNextButtonHtml(currentPage),
      ].join("");
    }

    // last page
    if (currentPage === numOfPages && numOfPages > 1) {
      return [
        this._generatePreviousButtonHtml(currentPage),
        this._generatePagesCountHtml(numOfPages),
      ].join("");
    }

    // other page
    if (currentPage < numOfPages) {
      return this._generateBothButtons(currentPage, numOfPages);
    }
    // only one page
    return "";
  }

  _generateNextButtonHtml(currentPage) {
    return `
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="pagination__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
  }

  _generatePreviousButtonHtml(currentPage) {
    return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="pagination__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          `;
  }

  _generatePagesCountHtml(numberOfPages) {
    return `<span class="pagination__total-pages">${numberOfPages} pages</span>`;
  }

  _generateBothButtons(currentPage, numberOfPages) {
    return [
      this._generatePreviousButtonHtml(currentPage),
      this._generatePagesCountHtml(numberOfPages),
      this._generateNextButtonHtml(currentPage),
    ].join("");
  }
}

export default new PaginationView();
