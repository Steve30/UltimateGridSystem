import { ColumnContainer } from "./ColumnContainer.js";

"use strict";

export class TableContainer {
  constructor() {
    this.container = document.querySelector("#grid-template");
    const clone = document.importNode(this.container.content, true);

    document.body.appendChild(clone);

    this.createProxyTable();

    this.gridContainer.appendChild(new ColumnContainer(1));
    this.gridContainer.appendChild(new ColumnContainer(2));
    this.gridContainer.appendChild(new ColumnContainer(3));
  }

  createProxyTable() {
    this.gridContainer = document.querySelector("#grid-container");

    this.proxy = new Proxy(this.gridContainer, {
      set(target, property, value) {
        const prevValue = target[property];
        const columns = `${prevValue}${value}`;

        this.gridContainer[property] = columns;
        return Reflect.set(target, property, columns);
      }
    })
  }
}