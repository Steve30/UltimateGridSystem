import { DataEvent } from "../events/dataEvent.js";

"use strict";

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

    const { width, set } = columnConfig;

    ColumnContainer.$templateColumnsStyle = !width ? "auto" : width;

    this.sumOfCells = set.size;
    this.setCellTemplateAreas();

    this.columnIndex = ColumnContainer.$templateColumnsStyle.length - 1;
    this.render(columnName, columnConfig);
  }

  render(columnName, columnConfig) {
    const { isSearch, isAddRow, set, searchValue } = columnConfig;

    this.newRowChange = DataEvent.newRowChangeProxy();

    console.log(this.newRowChange);

    if (!this.newRowChange) {

      this.newRowChange = {
        [columnName]: null
      }
      ColumnContainer.existRowChanges = {
        [columnName]: null
      }
    } else {
      this.newRowChange[columnName] = null;
      ColumnContainer.existRowChanges[columnName] = null;
    }

    const searchTemplate = isSearch ? `<label class="searchfield-label search-row">
      <input class="searchfield" type="search" placeholder='Search in ${columnName}' name='searchfield-${columnName}' value='${searchValue ? searchValue : ""}'/>
    </label>` : "";

    const addRowTemplate = isAddRow ? `<label class="add-row-label add-row">
      <input type="text" class="add-row" name='addrow-${columnName}' placeholder="Create ${columnName}"/>
    </label>` : "";

    const cellTemplates = Array.from(set).map(({value}, index) => `<label style="grid-area: cell-${index}" class="cell-label cell-row">
      <input type="text" value="${value}" readonly/>
    </label>`).join("");

    this.container.innerHTML = `<div id="${columnName}" class="column">
      <strong>${columnName}</strong>
      ${searchTemplate}
      ${addRowTemplate}
      ${cellTemplates}
      <a href="" class="resize-border" style="grid-area: cell-border"></a>
    </div>`;
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
  }

  setCssVariable() {
    this.columnEl = document.querySelector(`#${this.columnName}`);

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
    const labels = this.columnEl.querySelectorAll(`.cell-label`);
    const addInputs = this.columnEl.querySelectorAll(`.add-row-label input`);

    labels.forEach((element) => {
      const { firstElementChild } = element;

      element.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { readOnly } = firstElementChild;

        if (readOnly) {
          firstElementChild.removeAttribute("readonly");
        }

      })

      firstElementChild.addEventListener("blur", () => {
        firstElementChild.readOnly = true;
      })

      firstElementChild.addEventListener("change", ({target: {value}}) => {
        ColumnContainer.existRowChanges[this.columnName] = value;
        firstElementChild.readOnly = true;
      })
    })

    addInputs.forEach(element => {
      element.addEventListener("change", (({ target: { value } }) => {
        console.log(value);
        this.newRowChange[this.columnName] = value;
      }))
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

}