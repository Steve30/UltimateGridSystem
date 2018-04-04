import {
  ColumnContainer
} from "./ColumnContainer.js";
import { LeadColumnContainer } from "./LeadColumnContainer.js";
import { SearchEvent } from "../events/searchEvent.js";
import { DataAdapter } from "../adapters/dataAdapter.js";
import { defaultConfig, leadColumnIdentity, columnConfigs } from "../gridConfig.js";

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
    this.dragAndDropColumn = dragAndDropColumn;
    this.isLeadColumnCheck = isLeadColumnCheck;

    this.columnTemplateAreas = columnConfigs.map(({id}) => `${id}`).join(" ");

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

    document.addEventListener("dropColumn", ({detail: {dragged, dropped}}) => {
      const dragIndex = columnConfigs.findIndex(({id}) => id === dragged);
      const dropIndex = columnConfigs.findIndex(({id}) => id === dropped);
      const dragObj = columnConfigs.find(({id}) => id === dragged);
      const dropObj = columnConfigs.find(({id}) => id === dropped);

      columnConfigs[dropIndex] = dragObj;
      columnConfigs[dragIndex] = dropObj;

      this.columnTemplateAreas = columnConfigs.map(({id}) => `${id}`).join(" ");
      this.setColumnTemplateAreas();
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

    if (isRefresh) {
      this.gridContainer.innerHTML = "";
    }

    const leadColumn = gridDataMap.get(leadColumnIdentity);

    if (leadColumn) {

      if (this.isLeadColumnCheck) {
        leadColumn.isCheck = this.isLeadColumnCheck;
      }

      const leadContainer = new LeadColumnContainer(leadColumn);
      this.gridContainer.appendChild(leadContainer.cloneContent());
      leadContainer.afterInserted();
    }

    for (const [columnName, columnConfig] of gridDataMap) {

      if (columnName !== leadColumnIdentity) {
        columnConfig.dragAndDropColumn = this.dragAndDropColumn;
        const columnContainer = new ColumnContainer(columnName, columnConfig);
        this.gridContainer.appendChild(columnContainer.cloneContent());
        columnContainer.afterInserted();
      }

    };

    ColumnContainer.newRowChange = DataAdapter.newRowChangeProxy();

    this.subscribeSearchPromise();
    this.setGridTemplateColumnsStyle();

    this.dataAdapter.addNewRowPromise().then(() => {
      this.renderColumns(true);
    });

    this.dataAdapter.sortPromise().then(() => {
      this.renderColumns(true);
    })
  }

  setGridTemplateColumnsStyle() {
    const templateColumns = ColumnContainer.$templateColumnsStyle.join(" ");
    this.gridContainer.style.gridTemplateColumns = templateColumns;
  }

  subscribeSearchPromise() {
    this.searchEvent.searchPromise().then(isSearch => {
      if (isSearch) {
        this.renderColumns(isSearch);
      }
    })
  }

  getFilteredRows(column, value, isSearchInDefaultRows = true) {
    const rows = isSearchInDefaultRows ? this.dataAdapter.defaultRows : this.dataAdapter.rows;
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