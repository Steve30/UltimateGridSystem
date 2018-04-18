import {
  ColumnContainer
} from "./ColumnContainer.js";

export class DropdownColumnContainer extends ColumnContainer {
  static set $currentDropdownConstructor(value) {
    this.currentDropdownConstructor = value;
  }

  static get $currentDropdownConstructor() {
    return this.currentDropdownConstructor;
  }

  constructor(columnName, columnConfig) {
    super(columnName, columnConfig);
  }

  render(columnName, columnConfig) {
    const {
      isSearchRow,
      isAddRow,
      set,
      searchValue,
      dragAndDropColumn,
      title,
      sortClass,
      type
    } = columnConfig;

    this.dragAndDropColumn = dragAndDropColumn;

    const values = Array.from(set).map(({
      value
    }) => value);

    this.dropDownListSet = new Set(values);
    this.generateDropdownListItems();

    const searchTemplate = isSearchRow ? `<div class="dropdown-holder">
      <label class="searchfield-label search-row">
        <input class="searchfield" type="search" placeholder='Search in ${columnName}' name='searchfield-${columnName}' value='${searchValue ? searchValue : ""}' readonly/>
        <i class="fa fa-chevron-down"></i>
      </label>
      <nav>
        <a href="" data-value="-all-">All cells</a>
        <a href="" class="empty-cell" data-value="-empty cells-">Empty cells</a>
        ${this.list}
      </nav>
    </div>` : "";

    const addRowTemplate = isAddRow ? `<div class="dropdown-holder">
      <label class="add-row-label add-row">
        <input type="text" class="add" name='addrow-${columnName}' placeholder="Create ${columnName}" readonly/>
        <i class="fa fa-chevron-down"></i>
      </label>
      <nav>${this.list}</nav>
    </div>` : "";

    const cellTemplates = values.map((value, index) => `<div class="dropdown-holder cell-row">
      <label style="grid-area: cell-${index}" class="cell-label">
        <input type="text" value="${value}" name="${columnName}-${index}" readonly/>
        <i class="fa fa-chevron-down"></i>
      </label>
      <nav>${this.list}</nav>
    </div>`).join("");

    this.setExistRowValues(values);

    this.container.innerHTML = `<div id="${columnName}" class="column dropdown ${type}">
      <a href="" class="title">${title}${this.order ? this.order.getTemplate(sortClass) : ""}</a>
      ${searchTemplate}
      ${addRowTemplate}
      ${cellTemplates}
      <a href="" class="resize-border" style="grid-area: cell-border"></a>
    </div>`;
  }

  generateDropdownListItems() {
    this.list = "";

    for (const value of this.dropDownListSet.values()) {
      if (value) {
        this.list += `<a href="" data-value="${value}">${value}</a>`;
      }
    }
  }

  afterInserted() {
    super.afterInserted();
    this.dropdownElements = this.columnEl.querySelectorAll(".dropdown-holder label");

    this.dropdownElements.forEach((element, index) => {
      element.addEventListener("click", this.onClickedDropdown.bind(this, index, element))
    })
  }

  onClickedDropdown(index, element, event) {
    event.preventDefault();
    event.stopPropagation();

    this.hideAllOpenedDropDown(index);

    const {
      nextElementSibling
    } = element;
    const isShow = nextElementSibling.classList.toggle("show");

    if (isShow) {
      DropdownColumnContainer.$currentDropdownConstructor = this.constructor.name;
      this.currentDropdown = element;
      this.initClickEventForItem(nextElementSibling.querySelectorAll("a"));
    } else {
      this.initClickEventForItem(nextElementSibling.querySelectorAll("a"), true);
      DropdownColumnContainer.$currentDropdownConstructor = null;
    }
  }

  hideAllOpenedDropDown(currentIndex) {
    this.dropdownElements.forEach((holderElement, holderIndex) => {

      if (holderIndex !== currentIndex) {
        const {
          nextElementSibling
        } = holderElement;

        if (nextElementSibling.classList.contains("show")) {
          nextElementSibling.classList.remove("show");
          this.initClickEventForItem(nextElementSibling.querySelectorAll("a"), true);
        }
      }

    });
  }

  initClickEventForItem(clickElements, isRemove = false) {
    clickElements.forEach(element => {
      if (isRemove) {
        delete element.onclick;
      } else {
        element.onclick = this.onClickedItem.bind(this);
      }
    })
  }

  onClickedItem(event) {
    event.preventDefault();

    const { target: { dataset: { value } } } = event;
    this.currentDropdown.control.value = value === "-all-" ? "" : value;
    this.currentDropdown.dispatchEvent(new Event("click"));

    setTimeout(() => {
      this.currentDropdown.control.dispatchEvent(new Event("change"));
    }, 10);

  }
}