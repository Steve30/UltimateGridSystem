export default class ContextMenu {

  set $menuHolderEl(element) {
    this.menuHolderEl = element;
  }

  get $menuHolderEl() {
    return this.menuHolderEl;
  }

  constructor(menuItemConfigs, autoSubscribeCustomEvent = false, customEventName = null) {
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

    this.customEventName = customEventName;
    this.clonedContent = document.importNode(container.content, true);
    this.clonedContent.querySelector("div").innerHTML = menuHtmls.join("");

    if (autoSubscribeCustomEvent) {
      this.subscribeCustomEvent();
    }

    window.addEventListener("hideCellContextMenu", this.hideContextMenu.bind(this));
  }

  hideContextMenu() {
    const el = this.menuHolderEl.querySelector(".context-menu.show");

    if (el) {
      el.classList.remove("show");
    }
  }

  subscribeCustomEvent() {
    window.addEventListener(this.customEventName, ({ detail }) => {
      const { offsetTop, offsetLeft, rowIndex } = detail;

      this.rowIndex = rowIndex;
      this.render(offsetLeft, offsetTop);
    })
  }

  render(xPosition, yPosition) {
    let el = this.menuHolderEl.querySelector(".context-menu");

    if (!el) {
      this.menuHolderEl.appendChild(this.clonedContent);
      el = this.menuHolderEl.querySelector(".context-menu");
    }

    el.style.top = `${yPosition}px`;
    el.style.left = `${xPosition}px`;

    el.classList.add("show");

    this.subscribeMenuItemClickEvents();
  }

  subscribeMenuItemClickEvents() {
    const menuItems = this.menuHolderEl.querySelectorAll("a");

    menuItems.forEach((element) => {
      element.onclick = this.menuItemClickEvent.bind(this);
    });
  }

  menuItemClickEvent(event) {
    event.preventDefault();
    const { currentTarget: {dataset: {id}} } = event;

    window.dispatchEvent(new CustomEvent(id, {
      detail: {
        rowIndex: this.rowIndex
      }
    }));

    this.hideContextMenu();
  }
}