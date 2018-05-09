import {
  ColumnContainer
} from "./ColumnContainer.js";
import {
  SearchEvent
} from "../events/searchEvent.js";
import {
  DataAdapter
} from "../adapters/dataAdapter.js";
import {
  defaultConfig,
  leadColumnIdentity,
  columnConfigs
} from "../gridConfig.js";
import {
  stringFilter
} from "../filters/stringFilter.js";
import {
  multiStringFilter
} from "../filters/multiStringFilter.js";
import {
  ColumnBuilder
} from "../builders/columnBuilder.js";
import {
  DropdownBuilder
} from "../builders/dropdownBuilder.js";
import {
  booleanFilter
} from "../filters/booleanFilter.js";

export class TableContainer {

  constructor(config = defaultConfig) {
    const {
      isSearchRow,
      isAddRow,
      dragAndDropColumn,
      isLeadColumnCheck
    } = config;

    this.searchEvent = new SearchEvent(this);
    this.dataAdapter = new DataAdapter();
    this.columnBuilder = new ColumnBuilder();

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

  }

  async renderGridLayout() {
    this.layout.appendChild(this.clonedContent);
    return true;
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

      columnContainers.forEach((column) => {
        column.afterContentInit();
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

      this.columnTemplateAreas = columnConfigs.map(({
        id
      }) => `${id}`).join(" ");
      this.setColumnTemplateAreas();
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
      layerX
    } = event;
    if (buttons === 1 && ColumnContainer.$selectedResizeColumn) {
      console.log(layerX);

      const {
        el: {
          clientWidth
        },
        index
      } = ColumnContainer.$selectedResizeColumn;

      console.log(clientWidth, layerX);

      ColumnContainer.setCurrentTemplateColumn(index, layerX);

      this.setGridTemplateColumnsStyle();
    }
  }

  renderColumns(isRefresh = false) {

    ColumnContainer.$allSearchFieldPromise = null;
    ColumnContainer.resetTemplateColumnsStyle();

    const gridDataMap = this.dataAdapter.getDataMap(this.searchedColumns);
    const leadColumn = gridDataMap.get(leadColumnIdentity);
    const builderPromises = [];

    if (isRefresh) {
      this.gridContainer.innerHTML = "";
    }

    if (leadColumn) {

      if (this.isLeadColumnCheck) {
        leadColumn.isCheck = this.isLeadColumnCheck;
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

        builderPromises.push(this.columnBuilder.promiseBuild(columnConfig, columnName)
          .then((createdContainer) => {
            this.gridContainer.appendChild(createdContainer.cloneContent())
            return createdContainer;
          }));
      }

    };

    return Promise.all(builderPromises)
      .then(columnContainers => {
        columnContainers.forEach(columnContainer => {
          columnContainer.afterInserted();
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