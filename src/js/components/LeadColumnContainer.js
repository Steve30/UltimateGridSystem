import { ColumnContainer } from "./ColumnContainer.js";

export class LeadColumnContainer extends ColumnContainer {
  constructor(columnConfig) {

    columnConfig.width = "2%";

    super("lead", columnConfig);
  }

  render(columnName, columnConfig) {
    const { isSearchRow, isAddRow, set, isCheck } = columnConfig;

    const checkTemplate = isCheck ? `<span class="check-holder"><i class="fa fa-check"></i></span>` : "";

    const searchButton = isSearchRow ? `<a href="" class="search-button search-row"><i class="fa fa-search"></i></a>` : "";

    const addButton = isAddRow ? `<a href="" class="add-button add-row"><i class="fa fa-plus"></i></a>` : "";

    const cellTemplates = Array.from(set).map(({ value }, index) => `<a href="" class="row-number cell-row" data-id="${value}" style="grid-area: cell-${index}"
    >${checkTemplate}</a>`).join("");

    ColumnContainer.existRowChanges = Array.from(set).map(({value}) => {
      return {rowId: value}
    });

    this.isCheck = isCheck;

    this.container.innerHTML = `<div id="${columnName}" class="column ${isCheck ? 'check-column' : ''}">
      <a href="" class="title">${checkTemplate}</a>
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
    const cellRowLength = this.columnEl.querySelectorAll(".cell-row").length;
    const titleRow = this.columnEl.querySelector(".title");

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
          case "title":
            if (this.isCheck) {
              currentTarget.classList.toggle("checked");

              this.columnEl.querySelectorAll(".cell-row").forEach(cellElement => {
                cellElement.classList.toggle("checked");
              })
            }
            break;
          case "row-number":
            if (this.isCheck) {
              currentTarget.classList.toggle("checked");

              const length = this.columnEl.querySelectorAll(".cell-row.checked").length;

              if (length === cellRowLength) {
                titleRow.classList.add("checked");
              } else {
                titleRow.classList.remove("checked");
              }

            }
            break;
          default:
            break;
        }
      })
    })
  }
}