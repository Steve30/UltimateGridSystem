import { ColumnContainer } from "../components/ColumnContainer.js";
import { leadColumnIdentity } from "../gridConfig.js";

export class DataAdapter {
  constructor() {
    if (!DataAdapter.singleton) {
      DataAdapter.singleton = this;
    }

    this.rows = [{
      [leadColumnIdentity]: 1,
      names: "István",
      sexes: "Férfi",
      adults: true
    }, {
      [leadColumnIdentity]: 2,
      names: "Zsófia",
      sexes: "Lány",
      adults: false
    }, {
      [leadColumnIdentity]: 3,
      names: "Viktóra",
      sexes: "Nő",
      adults: true
    }];

    this.defaultRows = this.rows.slice(0);
  }

  addNewRowPromise() {
    return new Promise(resolve => {
      document.addEventListener("addButtonClicked", () => {
        const {getValidNewRow} = ColumnContainer.newRowChange;
        const newRowId = this.rows.length + 1;

        let newRowObj = {
          [leadColumnIdentity]: newRowId
        }

        Object.assign(newRowObj, getValidNewRow);

        this.rows.unshift(newRowObj);
        this.defaultRows = this.rows.slice(0);

        resolve(true);
      })
    })
  }

  getDataMap(searchedColumns) {
    const dataMap = new Map();

    this.rows.forEach((item) => {
      for (const [name, value] of Object.entries(item)) {
        const dataConfig = dataMap.get(name);
        const existSearchedColumns = searchedColumns.find(item => item && item[name]);

        if (dataConfig) {

          if (existSearchedColumns) {
            dataConfig.searchValue = existSearchedColumns[name];
          }

          dataConfig.set.add({
            value
          });
        } else {
          dataMap.set(name, {
            isSearch: true,
            isAddRow: true,
            searchValue: existSearchedColumns ? existSearchedColumns[name] : null,
            set: new Set([{
              value
            }])
          });
        }
      }
    })

    return dataMap;
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