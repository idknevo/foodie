class Preview {
  _generateHtml(data) {
    const id = window.location.hash.slice(1);
    return `
          <li class="preview">
            <a href="#${data.id}" class="preview__link ${
      data.id === id ? "preview__link--active" : ""
    }">
              <figure class="preview__figure">
                <img src="${data.image}" alt="${data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">
                  ${data.title}
                </h4>
                <p class="preview__publisher">${data.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new Preview();
