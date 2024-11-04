import View from "./view";
import preview from "./preview.js";
import icons from "url:../../imgs/icons.svg";
import preview from "./preview.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _bookmarks = document.querySelector(".bookmarks");
  _openBookmarksBtn = document.querySelector(".nav__btn--bookmarks");
  _closeBookmarksBtn = document.querySelector(".bookmarks__close");

  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  constructor() {
    super();
    this._addHandlerShowBookmarks();
    this._addHandlerHideBookmarks();
  }

  _addHandlerShowBookmarks() {
    this._openBookmarksBtn.addEventListener(
      "click",
      this._toggleBookmarks.bind(this)
    );
  }

  _addHandlerHideBookmarks() {
    this._closeBookmarksBtn.addEventListener(
      "click",
      this._toggleBookmarks.bind(this)
    );
    document.addEventListener("keydown", this._escBtnCloseBookmarks.bind(this));
  }

  _toggleBookmarks() {
    this._bookmarks.classList.toggle("bookmarks__open");
  }

  _escBtnCloseBookmarks(e) {
    if (
      e.key === "Escape" &&
      this._bookmarks.classList.contains("bookmarks__open")
    )
      this._toggleBookmarks();
  }

  // _hideBookmarks() {
  //   this._bookmarks.classList.remove("bookmarks__open");
  // }

  _generateHtml() {
    // console.log(this._data);
    return this._data
      .map((bookmark) => preview._generateHtml(bookmark))
      .join("");
  }
}

export default new BookmarksView();
