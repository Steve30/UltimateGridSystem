import { ColumnContainer } from "./ColumnContainer.js";

"use strict";

export class TableContainer {
  constructor() {
    this.container = document.querySelector("#grid-template");
    const clone = document.importNode(this.container.content, true);

    document.body.appendChild(clone);

    this.createProxyTable();

    this.searchedColumns = [];

    this.rows = [{
      names: "István",
      sexes: "Férfi",
      adults: true
    }, {
      names: "Zsófia",
      sexes: "Lány",
      adults: false
    }, {
      names: "Viktóra",
      sexes: "Nő",
      adults: true
      }];

    this.defaultRows = this.rows.slice(0);

    this.renderColumns();
  }

  renderColumns(isRefresh = false) {

    const gridDataMap = new Map();
    ColumnContainer.$allSearchFieldPromise = null;

    this.rows.forEach((item) => {
      for (const [name, value] of Object.entries(item)) {
        const dataConfig = gridDataMap.get(name);
        const existSearchedColumns = this.searchedColumns.find(item => item && item[name]);

        if (dataConfig) {

          if (existSearchedColumns) {
            dataConfig.searchValue = existSearchedColumns[name];
          }

          dataConfig.set.add({value});
        } else {
          gridDataMap.set(name, {
            isSearch: true,
            searchValue: existSearchedColumns ? existSearchedColumns[name] : null,
            set: new Set([{value}])
          });
        }
      }
    })

    if (isRefresh) {
      this.gridContainer.innerHTML = "";
    }

    for (const [columnName, columnConfig] of gridDataMap) {
      const columnContainer = new ColumnContainer(columnName, columnConfig);

      this.gridContainer.appendChild(columnContainer.cloneContent());

      columnContainer.afterInserted();
    };

    this.subscribeSearchPromise();
  }

  subscribeSearchPromise() {
    if (ColumnContainer.$allSearchFieldPromise.length > 0) {
      Promise.race(ColumnContainer.$allSearchFieldPromise).then(search => {
        const { columnName, searchValue } = search;
        let isSearchInDefaultRows = true;

        let find = this.searchedColumns.find(item => item && item[columnName]);

        if (this.searchedColumns.length > 0) {
          this.searchedColumns.forEach(searchColumn => {
            for (const [column, value] of Object.entries(searchColumn)) {
              if (column !== columnName) {
                this.rows = this.getFilteredRows(column, value);
                isSearchInDefaultRows = false;
              }
            }
          })
        }

        this.rows = this.getFilteredRows(columnName, searchValue, isSearchInDefaultRows);

        if (find) {
          find[columnName] = searchValue;
        } else {
          this.searchedColumns.push({ [columnName]: searchValue });
        }

        this.renderColumns(true);
      })
    }
  }

  getFilteredRows(column, value, isSearchInDefaultRows = true) {
    const rows = isSearchInDefaultRows ? this.defaultRows : this.rows;
    return rows.filter((item) => item[column].toLowerCase().includes(value));
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