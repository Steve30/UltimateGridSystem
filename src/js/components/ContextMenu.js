export default class ContextMenu {
  constructor(menuItemConfigs) {
    const container = document.querySelector("#context-menu-template");

    const menuHtmls = menuItemConfigs.map((itemGroups) => {

      const itemFrags = itemGroups.map((item) => {
        let { keyHelper, title, iconClass, id } = item;

        if (!keyHelper) {
          keyHelper = " ";
        }

        if (!iconClass) {
          iconClass = "";
        }

        return `<a href="" data-key-helper="${keyHelper}" data-id="${id}">
          <i class="${iconClass}">&nbsp;</i>
          <span>${title}</span>
        </a>`
      });

      return `<nav>${itemFrags.join("")}</nav>`;
    });

    this.clonedContent = document.importNode(container.content, true);
    this.clonedContent.querySelector("div").innerHTML = menuHtmls.join("");
  }

  render(menuHolderEl, xPosition, yPosition) {
    let el = menuHolderEl.querySelector(".context-menu");

    if (!el) {
      menuHolderEl.appendChild(this.clonedContent);
      el = menuHolderEl.querySelector(".context-menu");
    }

    el.style.top = `${yPosition}px`;
    el.style.left = `${xPosition}px`;

    el.classList.add("show");
  }
}