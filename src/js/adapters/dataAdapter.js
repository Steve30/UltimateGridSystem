import {
  columnConfigs,
  leadColumnIdentity
} from "../gridConfig.js";

import {
  ColumnContainer
} from "../components/ColumnContainer.js";

export class DataAdapter {

  static set $defaultRows(rows) {
    this.defaultRows = rows;
  }

  static get $defaultRows() {
    return this.defaultRows;
  }

  static set $defaultSortRows(value) {
    this.defaultSortRows = value;
  }

  static get $defaultSortRows() {
    return this.defaultSortRows;
  }

  set $sortedConfig(value) {
    this.sortedConfig = value;
  }

  get $sortedConfig() {
    return this.sortedConfig;
  }

  constructor() {
    if (!DataAdapter.singleton) {
      DataAdapter.singleton = this;
    }

    this.rows = [{
      [leadColumnIdentity]: 1,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 2,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 3,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 6,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 7,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 8,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 9,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 10,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 11,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 12,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 13,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 14,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 15,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 16,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 17,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 18,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 19,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 20,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 21,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 22,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 23,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 24,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 25,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 26,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 27,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 28,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 29,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 30,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 31,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 32,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 33,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 34,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 35,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 36,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 37,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 38,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 39,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 40,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 41,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 42,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 43,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 44,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 45,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 46,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 47,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 48,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 49,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 50,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 51,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 52,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 53,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 54,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 55,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 56,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 57,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 58,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 59,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 60,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 61,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 62,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 64,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 65,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 66,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 67,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 68,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 69,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 70,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 71,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 72,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 73,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 74,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 75,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 76,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    },{
      [leadColumnIdentity]: 77,
      names: "István",
      sexes: "Férfi",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 78,
      names: "Zsófia",
      sexes: "Lány",
      adults: false,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 79,
      names: "Viktóra",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 80,
      names: "Tímea",
      sexes: "Nő",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }, {
      [leadColumnIdentity]: 81,
      names: "Athos",
      sexes: "",
      adults: true,
      city: "Monor",
      zipcode: 2200,
      street: "Szilágyi Dezső utca 1."
    }];

    this.defaultRows = this.rows.slice(0);
    DataAdapter.$defaultRows = this.defaultRows;
  }

  rowSortChange(callback) {
    return new Proxy([], {
      set(target, property, value) {

        if (typeof callback === "function") {
          callback(value);
        }

        return Reflect.set(target, property, value);
      }
    })
  }

  rowDataChange(callback) {

    return new Proxy({
      isAdd: null,
      deleteRows: null
    }, {
      set(target, property, value) {

        if (typeof callback === "function" && property === "isAdd" && value) {
          const {
            getValidNewRow
          } = ColumnContainer.newRowChange;

          let newRowObj = {
            [leadColumnIdentity]: null
          }

          Object.assign(newRowObj, getValidNewRow);
          callback(property, newRowObj);
        } else if (typeof callback === "function"
                  && property === "deleteRows"
                  && Array.isArray(value)) {
          callback(property, value);
        }

        return Reflect.set(target, property, null);
      }
    })
  }

  async addedNewRow(newRowObj) {
    const id = this.rows.length + 1;
    newRowObj[leadColumnIdentity] = id;

    this.rows.unshift(newRowObj);
    this.defaultRows = this.rows.slice(0);
    DataAdapter.$defaultRows = this.defaultRows;

    return true;
  }

  async deleteRows(ids) {
    this.rows.forEach((row, index) => {
      const deletedIndex = ids.indexOf(row[leadColumnIdentity]);

      if (deletedIndex) {
        ids.splice(deletedIndex, 1);
        this.rows.splice(index, 1);
      }
    });

    this.defaultRows = this.rows.slice(0);
    DataAdapter.$defaultRows = this.defaultRows;

    return true;
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
          const columnConfig = columnConfigs.find(item => item.id === name);

          if (this.sortedConfig && this.sortedConfig.columnName === name) {
            columnConfig.sortClass = this.sortedConfig.sortClass;
          }

          Object.assign(columnConfig, {
            searchValue: existSearchedColumns ? existSearchedColumns[name] : null,
            set: new Set([{
              value
            }])
          })

          dataMap.set(name, columnConfig);
        }
      }
    });

    return dataMap;
  }

  static newRowChangeProxy() {
    const {
      singleton
    } = this;

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
    const {
      singleton
    } = this;

    return new Proxy(ColumnContainer.existRowChanges, {
      set(target, properties, column) {

        const prevRowObj = target[properties];

        for (const [key, value] of Object.entries(column)) {
          const prevValue = prevRowObj[key];

          if (prevValue !== undefined && prevValue !== value) {
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