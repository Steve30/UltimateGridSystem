import {
  ColumnContainer
} from "./ColumnContainer.js";

export class CheckboxColumnContainer extends ColumnContainer {
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
      sortClass
    } = columnConfig;

    const values = Array.from(set).map(({
      value
    }) => new Boolean(value).valueOf());

    this.dragAndDropColumn = dragAndDropColumn;

    if (!this.typeOfCheckboxClass) {
      this.typeOfCheckboxClass = "";
    }

    const searchFieldValue = new Boolean(searchValue === "true").valueOf();

    const searchTemplate = isSearchRow ? `<label class="searchfield-label search-row">
      <span>Search in ${title} state:</span>
      <input class="searchfield ${this.typeOfCheckboxClass}" type="checkbox" name='searchfield-${columnName}' ${searchFieldValue ? "checked" : ""} value="${searchFieldValue ? 'false' : 'true'}"/>
    </label>` : "";

    const addRowTemplate = isAddRow ? `<label class="add-row-label add-row">
      <span>Check the ${title} state:</span>
      <input type="checkbox" class="add ${this.typeOfCheckboxClass}" name='addrow-${columnName}' value="true"/>
    </label>` : "";

    const cellTemplates = values.map((value, index) => `<label style="grid-area: cell-${index}" class="cell-label cell-row ${this.dragAndDropRow ? "drop-row" : ""}">
      ${this.renderCellContent(`<span class="cell-content">
        <input type="checkbox"  ${value ? "checked" : ""} name="${columnName}-${index}" value="${value ? 'false' : 'true'}" class="${this.typeOfCheckboxClass}"/>
        <span>State:</span>
      </span>`)}
    </label>`).join("");

    this.setExistRowValues(values);

    this.container.innerHTML = `<div id="${columnName}" class="column checkbox">
      <header>
        <a href="" class="title">
          <span>${title}</span>
          <span>
            ${this.order ? this.order.getTemplate(sortClass) : ""}
            <i class="pin fas fa-thumbtack"></i>
          </span>
        </a>
        ${searchTemplate}
        ${addRowTemplate}
      </header>
      ${cellTemplates}
      <footer></footer>
      <a href="" class="resize-border" style="grid-area: cell-border"></a>
    </div>`;
  }
}