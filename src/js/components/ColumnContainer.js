import { DataAdapter } from "../adapters/dataAdapter.js";

import { default as defaultOrder} from "../orders/defaultOrder.js";

export class ColumnContainer {

  static set $allSearchFieldPromise(value) {

    const isPromise = value instanceof Promise ? true : false;

    if (Array.isArray(this.allSearchFieldPromise) && isPromise) {
      this.allSearchFieldPromise.push(value);
    } else if (isPromise) {
      this.allSearchFieldPromise = [value];
    } else {
      this.allSearchFieldPromise = [];
    }

  }

  static get $allSearchFieldPromise() {
    return this.allSearchFieldPromise;
  }

  static set $selectedResizeColumn(value) {
    this.selectedResizeColumn = value;
  }

  static get $selectedResizeColumn() {
    return this.selectedResizeColumn;
  }

  static set $templateColumnsStyle(value) {
    this.templateColumnsStyle.push(value);
  }

  static get $templateColumnsStyle() {
    return this.templateColumnsStyle;
  }

  constructor(columnName, columnConfig) {
    this.container = document.querySelector("#column-template").cloneNode();
    this.columnName = columnName;

    const { width, set, isOrder } = columnConfig;

    if (isOrder) {
      this.initOrderClass();
    }

    ColumnContainer.$templateColumnsStyle = !width ? "auto" : width;

    this.sumOfCells = set.size;
    this.setCellTemplateAreas();

    this.columnIndex = ColumnContainer.$templateColumnsStyle.length - 1;
    this.render(columnName, columnConfig);
  }

  render(columnName, columnConfig) {
    const { isSearchRow, isAddRow, set, searchValue, dragAndDropColumn, title, sortClass } = columnConfig;

    this.dragAndDropColumn = dragAndDropColumn;

    const searchTemplate = isSearchRow ? `<label class="searchfield-label search-row">
      <input class="searchfield" type="search" placeholder='Search in ${columnName}' name='searchfield-${columnName}' value='${searchValue ? searchValue : ""}'/>
    </label>` : "";

    const addRowTemplate = isAddRow ? `<label class="add-row-label add-row">
      <input type="text" class="add-row" name='addrow-${columnName}' placeholder="Create ${columnName}"/>
    </label>` : "";

    const cellTemplates = Array.from(set).map(({value}, index) => `<label style="grid-area: cell-${index}" data-row-index="${index}" class="cell-label cell-row">
      <input type="text" value="${value}" name="${columnName}-${index}" readonly/>
    </label>`).join("");

    this.container.innerHTML = `<div id="${columnName}" class="column">
      <a href="" class="title">${title}${this.order ? this.order.getTemplate(sortClass) : ""}</a>
      ${searchTemplate}
      ${addRowTemplate}
      ${cellTemplates}
      <a href="" class="resize-border" style="grid-area: cell-border"></a>
    </div>`;
  }

  initOrderClass() {
    this.order = new defaultOrder(this.columnName);
  }

  static resetTemplateColumnsStyle() {
    this.templateColumnsStyle = [];
  }

  static setCurrentTemplateColumn(index, value) {
    this.templateColumnsStyle[index] = `${value}px`;
  }

  setCellTemplateAreas() {
    const cellTemplateAreas = [];

    for (let i = 0; i < this.sumOfCells; i++) {
      cellTemplateAreas.push(`"cell-${i} cell-border"`);
    }

    this.cellTemplateAreas = cellTemplateAreas.join(" ");
  }

  cloneContent() {
    return document.importNode(this.container.content, true);
  }

  afterInserted() {
    this.setCssVariable();
    this.addPromiseSearchField();
    this.subscribeCellClickEvent();
    this.subscribeRowResizeEvent();

    if (this.dragAndDropColumn) {
      this.setDragAndDropAction();
    }

    this.columnEl.querySelector(".title").addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      const { target } = event;

      if (target.classList.contains("sort")) {
        this.order.sortAction(target);
      }
    })
  }

  setCssVariable() {
    this.columnEl = document.querySelector(`#${this.columnName}`);

    this.columnEl.style.gridArea = this.columnName !== "lead" ? this.columnName : "id";
    this.columnEl.style.setProperty("--cell-template-areas", this.cellTemplateAreas);
    this.columnEl.style.setProperty("--sum-of-cell", this.sumOfCells);
  }

  addPromiseSearchField() {
    const searchFieldEl = document.querySelector(`[name=searchfield-${this.columnName}]`);

    if (searchFieldEl) {
      const promise = new Promise(resolve => {
        searchFieldEl.addEventListener("change", (event) => {
          const { value } = event.target;

          resolve({
            columnName: this.columnName,
            searchValue: value
          })
        })
      })

      ColumnContainer.$allSearchFieldPromise = promise;

    }
  }

  subscribeCellClickEvent() {

    this.existRowChanges = DataAdapter.existRowChangeProxy();

    const labels = this.columnEl.querySelectorAll(`.cell-label`);
    const addInput = this.columnEl.querySelector(`.add-row-label input`);

    if (!ColumnContainer.newRowChanges) {
      ColumnContainer.newRowChanges = {
        [this.columnName]: null
      }
    } else {
      ColumnContainer.newRowChanges[this.columnName] = null;
    }

    addInput.addEventListener("change", ({target: {value}})=> {
      ColumnContainer.newRowChange[this.columnName] = value;
    })

    labels.forEach((element) => {
      const { firstElementChild } = element;

      element.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { readOnly, name, value } = firstElementChild;

        const splitted = name.split("-");

        this.existRowChanges[splitted[1]] = {
          [this.columnName]: value
        };

        if (readOnly) {
          firstElementChild.removeAttribute("readonly");
        }

      })

      firstElementChild.addEventListener("blur", () => {
        firstElementChild.readOnly = true;
      })

      firstElementChild.addEventListener("change", ({target: {value, name}}) => {

        const splitted = name.split("-");

        this.existRowChanges[splitted[1]] = {
          [this.columnName]: value
        };

        firstElementChild.readOnly = true;
      })
    })


  }

  subscribeRowResizeEvent() {
    const resizeBorderEl = this.columnEl.querySelector(`.resize-border`);

    resizeBorderEl.addEventListener("mousedown", (event) => {
      event.preventDefault();
      ColumnContainer.$selectedResizeColumn = {
        el: this.columnEl,
        index: this.columnIndex
      };
    });
  }

  setDragAndDropAction() {
    this.columnEl.draggable = true;

    this.columnEl.addEventListener("dragstart", (event) => {
      const {target: {id}} = event;

      event.dataTransfer.setData("text", id);
      event.dataTransfer.effectAllowed = "move";
    })

    this.columnEl.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    })

    this.columnEl.addEventListener("drop", (event) => {
      event.preventDefault();

      const {currentTarget: {id}} = event;

      document.dispatchEvent(new CustomEvent("dropColumn", {
        detail: {
          dragged: event.dataTransfer.getData("text"),
          dropped: id
        }
      }))
    })
  }

}