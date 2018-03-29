import { ColumnContainer } from "./ColumnContainer.js";

"use strict";

export class LeadColumnContainer extends ColumnContainer {
  constructor(columnConfig) {

    columnConfig.width = "2%";

    super("lead", columnConfig);
  }

  render(columnName, columnConfig) {
    const { isSearch, isAddRow, set } = columnConfig;

    const searchButton = isSearch ? `<a href="" class="search-button search-row"><i class="fa fa-search"></i></a>` : "";

    const addButton = isAddRow ? `<a href="" class="add-button add-row"><i class="fa fa-plus"></i></a>` : "";

    const cellTemplates = Array.from(set).map(({ value }, index) => `<a href="" class="row-number cell-row" data-id="${value}" style="grid-area: cell-${index}"
    ></a>`).join("");

    ColumnContainer.existRowChanges = Array.from(set).map(({value}) => {
      return {rowId: value}
    });

    this.container.innerHTML = `<div id="${columnName}" class="column">
      <strong>&nbsp;</strong>
      ${searchButton}
      ${addButton}
      ${cellTemplates}
      <span class="end-border" style="grid-area: cell-border"></span>
    </div>`;
  }

  afterInserted() {
    this.setCssVariable();

    this.subscribeColumnItemClick();
  }

  subscribeColumnItemClick() {
    this.columnEl.querySelectorAll("a").forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { currentTarget } = event;
        const elementTypeByClassName = currentTarget.classList.item(0);

        switch (elementTypeByClassName) {
          case "search-button":
            document.dispatchEvent(new Event("searchButtonClicked"));
            break;
          case "add-button":
            document.dispatchEvent(new Event("addButtonClicked"));
            break;

          default:
            break;
        }
      })
    })
  }
}