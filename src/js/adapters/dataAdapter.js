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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
    },{
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
    }, {
      [leadColumnIdentity]: 4,
      names: "Tímea",
      sexes: "Nő",
      adults: true
    }, {
      [leadColumnIdentity]: 5,
      names: "Athos",
      sexes: "",
      adults: true
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