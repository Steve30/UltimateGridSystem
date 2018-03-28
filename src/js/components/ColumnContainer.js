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
    const { isSearch, set, searchValue } = columnConfig;

    ColumnContainer.$templateColumnsStyle = "auto";
    this.columnIndex = ColumnContainer.$templateColumnsStyle.length - 1;

    const searchTemplate = isSearch ? `<input class="searchfield" type="search" placeholder='Search in ${columnName}' name='searchfield-${columnName}' value='${searchValue ? searchValue : ""}'/>` : "";

    const cellTemplates = Array.from(set).map(({value}, index) => `<label style="grid-area: cell-${index}">
      <input type="text" value="${value}" readonly/>
    </label>`).join("");

    this.container.innerHTML = `<div id="${columnName}" class="column">
      <strong>${columnName}</strong>
      ${searchTemplate}
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

  cloneContent() {
    return document.importNode(this.container.content, true);
  }

  afterInserted() {
    this.addPromiseSearchField();
    this.subscribeCellClickEvent();
    this.subscribeRowResizeEvent();
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
    const labels = document.querySelectorAll(`#${this.columnName} label`);

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
        console.log(value);
        firstElementChild.readOnly = true;
      })
    })
  }

  subscribeRowResizeEvent() {
    const columnEl = document.querySelector(`#${this.columnName}`);
    const resizeBorderEl = columnEl.querySelector(`.resize-border`);

    resizeBorderEl.addEventListener("mousedown", (event) => {
      event.preventDefault();
      ColumnContainer.$selectedResizeColumn = {
        el: columnEl,
        index: this.columnIndex
      };
    });
  }

}