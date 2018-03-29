import { ColumnContainer } from "../components/ColumnContainer.js";

"use strict";

export class DataEvent {
  constructor() {
    if (!DataEvent.singleton) {
      DataEvent.singleton = this;

      document.addEventListener("addButtonClicked", this.addButtonClickedEvent.bind(this));
    }
  }

  addButtonClickedEvent() {
    const {getValidNewRow} = ColumnContainer.newRowChange;

    console.log(getValidNewRow);
  }

  static newRowChangeProxy() {
    const {singleton} = this;

    return new Proxy(ColumnContainer.newRowChanges, {
      set(target, properties, value) {
        return Reflect.set(target, properties, value);
      },
      get(target, properties) {
        if (properties === "getValidNewRow") {
          return target;
        } else {
          return false;
        }
      }
    })
  }

  static existRowChangeProxy() {
    const {singleton} = this;

    return new Proxy(ColumnContainer.existRowChanges, {
      set(target, properties, column) {

        const prevRowObj = target[properties];

        for (const [key, value] of Object.entries(column)) {
          const prevValue = prevRowObj[key];

          if (prevValue && prevValue !== value) {
            singleton.updateRow(prevRowObj.rowId, column);
          }
        }

        const valueObj = Object.assign(prevRowObj, column);

        return Reflect.set(target, properties, valueObj);
      }
    })
  }

  updateRow(id, data) {
    console.log(id);
    console.log(data);
  }
}