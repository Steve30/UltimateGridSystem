"use strict";

export class TableContainer {
  constructor() {
    this.container = document.querySelector("#grid-template");
    const clone = document.importNode(this.container.content, true);

    document.body.appendChild(clone);

    this.createProxyTable();

    this.proxy.innerHTML = "<div>Valami</div>";
    this.proxy.innerHTML = "<div>Valami2</div>";
  }

  createProxyTable() {
    this.proxy = new Proxy(this.container, {
      set(target, property, value) {
        const prevValue = target[property];

        //document.body[property] = `${prevValue}${value}`;
        return Reflect.set(target, property, value);
      }
    })
  }
}