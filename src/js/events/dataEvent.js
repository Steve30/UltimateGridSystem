"use strict";

export class DataEvent {
  constructor() {

  }

  static newRowChangeProxy() {
    return new Proxy({}, {
      set(target, properties, value) {
        console.log(value);
        return value ? Reflect.set(target, properties, value) : null;
      }
    })
  }
}