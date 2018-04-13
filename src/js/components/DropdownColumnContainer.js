import { ColumnContainer } from "./ColumnContainer.js";

export class DropdownColumnContainer extends ColumnContainer {
  constructor(columnName, columnConfig) {
    super(columnName, columnConfig);
  }

  render(columnName, columnConfig) {
    const { isSearchRow, isAddRow, set, searchValue, dragAndDropColumn, title, sortClass } = columnConfig;

    this.dragAndDropColumn = dragAndDropColumn;

    const values = Array.from(set).map(({ value }) => value);
    this.dropDownListSet = new Set(values);
    this.generateDropdownListItems();

    const searchTemplate = isSearchRow ? `<div class="dropdown-holder">
      <label class="searchfield-label search-row">
        <input class="searchfield" type="search" placeholder='Search in ${columnName}' name='searchfield-${columnName}' value='${searchValue ? searchValue : ""}' readonly/>
        <i class="fa fa-chevron-down"></i>
      </label>
      <nav>${this.list}</nav>
    </div>` : "";

    const addRowTemplate = isAddRow ? `<div class="dropdown-holder">
      <label class="add-row-label add-row">
        <input type="text" class="add" name='addrow-${columnName}' placeholder="Create ${columnName}" readonly/>
        <i class="fa fa-chevron-down"></i>
      </label>
      <nav>${this.list}</nav>
    </div>` : "";

    const cellTemplates = values.map((value, index) => `<label style="grid-area: cell-${index}" class="cell-label cell-row">
      <input type="text" value="${value}" name="${columnName}-${index}" readonly/>
    </label>`).join("");

    this.container.innerHTML = `<div id="${columnName}" class="column dropdown">
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
      this.list += `<a href="" data-value="${value}">${value}</a>`;
   }
  }

  afterInserted() {
    super.afterInserted();
  }
}