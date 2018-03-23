"use strict";

export class ColumnContainer {
  constructor(columnName) {
    this.container = document.querySelector("#column-template");

    this.container.innerHTML = `<div>Oszlop-${columnName}</div>`;

    const clone = document.importNode(this.container.content, true);

    return clone;
  }
}