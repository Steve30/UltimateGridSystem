import {
  columnConfigs,
  defaultConfig,
  leadColumnIdentity
} from "../gridConfig.js";

import {
  ColumnBuilder
} from "../builders/columnBuilder.js";
import {
  ColumnContainer
} from "./ColumnContainer.js";
import {
  DataAdapter
} from "../adapters/dataAdapter.js";
import {
  DropdownBuilder
} from "../builders/dropdownBuilder.js";
import {
  GridSettingsStore
} from "./GridSettingsStore.js";
import {
  SearchEvent
} from "../events/searchEvent.js";
import {
  booleanFilter
} from "../filters/booleanFilter.js";
import {
  multiStringFilter
} from "../filters/multiStringFilter.js";
import pinStore from "../stateSystem/store/pinStore/index.js";
import {
  stringFilter
} from "../filters/stringFilter.js";

export class TableContainer {

  constructor(config = defaultConfig) {
    const {
      isSearchRow,
      isAddRow,
      dragAndDropColumn,
      isLeadColumnCheck,
      dragAndDropRow
    } = config;

    this.searchEvent = new SearchEvent(this);
    this.dataAdapter = new DataAdapter();
    this.columnBuilder = new ColumnBuilder();

    this.dragAndDropRow = dragAndDropRow;
    this.dragAndDropColumn = dragAndDropColumn;
    this.isLeadColumnCheck = isLeadColumnCheck;
    this.isSearchRow = isSearchRow;
    this.isAddRow = isAddRow;

    this.columnTemplateAreas = columnConfigs.map(({
      id
    }) => `${id}`).join(" ");

    this.gridContainerClassSet = new Set();
    this.layout = document.querySelector("#layout");
    this.container = document.querySelector("#grid-template");
    this.clonedContent = document.importNode(this.container.content, true);

    this.pinStore = pinStore;

    this.pinStore.events.subscribe("stateChange", ({pinnedColumns}) => {

      const columns = Array.from(this.gridContainer.querySelectorAll(".column")).filter((element) => element.id !== "lead");

      columns.forEach((element) => {
        element.classList.remove(...["pinned", "last-pinned"]);
      });

      if (pinnedColumns.size !== 0) {
        for (const {pinColumn, classNames} of this.generatePinnedColumns(columns, pinnedColumns)) {
          pinColumn.classList.add(...classNames);
        }
      }

    });
  }

  *generatePinnedColumns (columns, pinnedColumns) {
    let isLatestPinnedColumn = false;

    for (const [ , column] of columns.entries()) {
      if (!isLatestPinnedColumn) {

        if (pinnedColumns.has(column.id)) {
          yield {pinColumn: column, classNames: ["pinned", "last-pinned"]};
          isLatestPinnedColumn = true;
        } else {
          yield {pinColumn: column, classNames: ["pinned"]};
        }
      }
    }
  }

  renderGridLayout() {
    const self = this;

    return new Promise((resolve) => {
      self.layout.appendChild(self.clonedContent);
      resolve(true);
    })
  }

  initGridTable() {

    this.createProxyTable();
    this.setColumnTemplateAreas();

    TableContainer.rowSortChangeProxy = this.dataAdapter.rowSortChange((changeColumnConfig) => {
      this.dataAdapter.rows = DataAdapter.$defaultRows.slice(0);
      this.dataAdapter.$sortedConfig = changeColumnConfig;
      this.renderColumns(true).then((columnContainers) => {
        columnContainers.forEach((column) => {
          column.afterContentInit();
        })
      }).catch(error => {
        console.error(error);
      });
    })

    TableContainer.rowDataChangeProxy = this.dataAdapter.rowDataChange((property, value) => {
      if (property === "isAdd") {
        this.dataAdapter.addedNewRow(value).then(() => {
          this.renderColumns(true).then((columnContainers) => {
            columnContainers.forEach((column) => {
              column.afterContentInit();
            })
          }).catch(error => {
            console.error(error);
          });;
        })
      } else if (property === "deleteRows") {
        this.dataAdapter.deleteRows(value).then(() => {
          this.renderColumns(true).then((columnContainers) => {
            columnContainers.forEach((column) => {
              column.afterContentInit();
            })
          }).catch(error => {
            console.error(error);
          });
        })
      }

    })

    if (this.isSearchRow) {
      this.gridContainerClassSet.add("on-search");
    }

    if (this.isAddRow) {
      this.gridContainerClassSet.add("on-add-row");
    }

    this.gridContainer.classList.add(...this.gridContainerClassSet.values());

    this.searchedColumns = [];

    this.renderColumns().then((columnContainers) => {
      DropdownBuilder.build(this.columnBuilder.defaultColumnMap);

      let incrementWidth = 0;

      columnContainers.forEach((column, index, _columns) => {
        column.afterContentInit();

        const nextColumnContainer = columnContainers[index + 1];

        if (nextColumnContainer) {
          incrementWidth += column.columnEl.offsetWidth;
          nextColumnContainer.columnEl.style.setProperty("--left-sticky-position", `${incrementWidth}px`);
        }

      })
    }).catch(error => {
      console.error(error);
    });

    this.gridContainer.addEventListener("mousemove", this.mouseMoveEvent.bind(this));
    this.gridContainer.addEventListener("mouseup", () => {
      delete ColumnContainer.$selectedResizeColumn;
    })

    document.addEventListener("dropColumn", ({
      detail: {
        dragged,
        dropped
      }
    }) => {

      const dragIndex = columnConfigs.findIndex(({
        id
      }) => id === dragged);
      const dropIndex = columnConfigs.findIndex(({
        id
      }) => id === dropped);
      const dragObj = columnConfigs.find(({
        id
      }) => id === dragged);
      const dropObj = columnConfigs.find(({
        id
      }) => id === dropped);

      columnConfigs[dropIndex] = dragObj;
      columnConfigs[dragIndex] = dropObj;

      const columnIds = columnConfigs.map(({
        id
      }) => `${id}`);

      this.columnTemplateAreas = columnIds.join(" ");

      const allColumnsSave = columnIds.map((item, index) => {
        const columnId = item === "id" ? "lead" : item;
        const columnEl = this.gridContainer.querySelector(`#${columnId}`);

        return GridSettingsStore.saveColumnPosition(columnId, {
          position: index,
          width: columnEl.clientWidth
        });
      });

      Promise.all(allColumnsSave).then(() => {
        GridSettingsStore.saveStoreToLocalStorage();
        this.setColumnTemplateAreas();
      })

    })

    this.gridContainer.addEventListener("deleteKeyDown", () => {
      const checkedRows = this.gridContainer.querySelectorAll(".cell-row.checked");

      const checkedRowIds = Array.from(checkedRows).map(({
        dataset: {
          id
        }
      }) => id);

      if (checkedRowIds.length > 0) {
        TableContainer.rowDataChangeProxy.deleteRows = checkedRowIds;
      }
    })
  }

  setColumnTemplateAreas() {
    this.gridContainer.style.setProperty("--column-template-areas", `"${this.columnTemplateAreas}"`);
  }

  mouseMoveEvent(event) {
    const {
      buttons,
      movementX
    } = event;

    if (buttons === 1 && ColumnContainer.$selectedResizeColumn) {

      const hasPinned = ColumnContainer.$selectedResizeColumn.el.classList.contains("pinned");

      if (hasPinned) {
        return;
      }

      const {
        el: {
          clientWidth
        },
        index
      } = ColumnContainer.$selectedResizeColumn;

      ColumnContainer.setCurrentTemplateColumn(index, clientWidth + movementX);

      this.setGridTemplateColumnsStyle();
    }
  }

  renderColumns(isRefresh = false) {

    ColumnContainer.$allSearchFieldPromise = null;
    ColumnContainer.resetTemplateColumnsStyle();

    const gridDataMap = this.dataAdapter.getDataMap(this.searchedColumns);
    const leadColumn = gridDataMap.get(leadColumnIdentity);
    const builderPromises = [];

    ColumnContainer.$maxColumnWidth = (100 - 2) / (gridDataMap.size - 1);

    if (isRefresh) {
      this.gridContainer.innerHTML = "";
    }

    if (leadColumn) {

      if (this.isLeadColumnCheck) {
        leadColumn.isCheck = this.isLeadColumnCheck;
        leadColumn.dragAndDropRow = this.dragAndDropRow;
      }

      builderPromises.push(this.columnBuilder.promiseBuild(leadColumn)
        .then((createdContainer) => {
          this.gridContainer.appendChild(createdContainer.cloneContent())
          return createdContainer;
        }))
    }

    for (const [columnName, columnConfig] of gridDataMap) {

      if (columnName !== leadColumnIdentity) {
        columnConfig.dragAndDropColumn = this.dragAndDropColumn;
        columnConfig.dragAndDropRow = this.dragAndDropRow;

        builderPromises.push(this.columnBuilder.promiseBuild(columnConfig, columnName)
          .then((createdContainer) => {
            this.gridContainer.appendChild(createdContainer.cloneContent())
            return createdContainer;
          }));
      }

    }

    return Promise.all(builderPromises)
      .then(columnContainers => {
        columnContainers.forEach(columnContainer => {
          columnContainer.afterInserted(this.pinStore);
        })

        return columnContainers;
      }).then((columnContainers) => {
        ColumnContainer.newRowChange = DataAdapter.newRowChangeProxy();

        this.subscribeSearchPromise();
        this.setGridTemplateColumnsStyle();

        return columnContainers;
      });
  }

  setGridTemplateColumnsStyle() {
    const templateColumns = ColumnContainer.$templateColumnsStyle.join(" ");
    this.gridContainer.style.gridTemplateColumns = templateColumns;
  }

  subscribeSearchPromise() {
    this.searchEvent.searchPromise().then(isSearch => {
      if (isSearch) {
        this.dataAdapter.rows = this.rows;
        this.renderColumns(isSearch).then((columnContainers) => {
          columnContainers.forEach((column) => {
            column.afterContentInit();
          })
        }).catch(error => {
          console.error(error);
        });
      }
    })
  }

  getFilteredRows(column, value, isSearchInDefaultRows = true) {
    const rows = isSearchInDefaultRows ? this.dataAdapter.defaultRows : this.dataAdapter.rows;

    let filtered;
    const {
      filterType
    } = columnConfigs.find(item => item.id === column);

    switch (filterType) {
      case "string":
        filtered = stringFilter(rows, column, value.toLowerCase());
        break;
      case "multiString":
        filtered = multiStringFilter(rows, column, value.toLowerCase());
        break;
      case "boolean":
        filtered = booleanFilter(rows, column, value);
        break;
      default:
        filtered = rows.filter((item) => item[column].toLowerCase().includes(value));
        break;
    }

    return filtered;
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