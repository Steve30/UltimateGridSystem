import { ColumnContainer } from "./ColumnContainer.js";

"use strict";

const defaultConfig = {
  isSearchRow: false,
  isAddRow: false
}

export class TableContainer {
  constructor(config = defaultConfig) {
    const { isSearchRow, isAddRow } = config;

    this.setRowData();

    this.columnTemplateAreas = this.rows.map(() => "column").join(" ");

    this.gridContainerClassSet = new Set();
    this.layout = document.querySelector("#layout");
    this.container = document.querySelector("#grid-template");
    const clone = document.importNode(this.container.content, true);

    this.layout.appendChild(clone);

    this.createProxyTable();
    this.setColumnTemplateAreas();

    if (isSearchRow) {
      this.gridContainerClassSet.add("on-search");
    }

    if (isAddRow) {
      this.gridContainerClassSet.add("on-add-row");
    }

    this.gridContainer.classList.add(...this.gridContainerClassSet.values());

    this.searchedColumns = [];

    this.renderColumns();

    this.gridContainer.addEventListener("mousemove", this.mouseMoveEvent.bind(this));
    this.gridContainer.addEventListener("mouseup", () => {
      delete ColumnContainer.$selectedResizeColumn;
    })
  }

  setRowData() {
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
  }

  setColumnTemplateAreas() {
    this.gridContainer.style.setProperty("--column-template-areas", `"${this.columnTemplateAreas}"`);
  }

  mouseMoveEvent(event) {
    const { buttons, layerX} = event;
    if (buttons === 1 && ColumnContainer.$selectedResizeColumn) {
      console.log(layerX);

      const { el: { clientWidth }, index } = ColumnContainer.$selectedResizeColumn;

      console.log(clientWidth, layerX);

      ColumnContainer.setCurrentTemplateColumn(index, layerX);

      this.setGridTemplateColumnsStyle();
    }
  }

  renderColumns(isRefresh = false) {

    const gridDataMap = new Map();
    ColumnContainer.$allSearchFieldPromise = null;
    ColumnContainer.resetTemplateColumnsStyle();

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
            isAddRow: true,
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
    this.setGridTemplateColumnsStyle();
  }

  setGridTemplateColumnsStyle() {
    const templateColumns = ColumnContainer.$templateColumnsStyle.join(" ");
    this.gridContainer.style.gridTemplateColumns = templateColumns;
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