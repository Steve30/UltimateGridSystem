import {
  TableContainer
} from "./components/TableContainer.js";
import {
  default as GridEvent
} from "./events/gridEvent.js";
import ContextMenu from "./components/ContextMenu.js";
import {
  default as contextMenuConfig
} from "./components/contextMenus/contextMenuConfig.js";
import { emptyRow } from "./gridConfig.js";
import { DataAdapter } from "./adapters/dataAdapter.js";

const tableContainer = new TableContainer({
  isSearchRow: true,
  isAddRow: true,
  dragAndDropColumn: true,
  isLeadColumnCheck: true
});

const gridEvent = new GridEvent({
  deleteRow: true
});

const contextMenu = new ContextMenu(contextMenuConfig, true, "cellContextMenu");

tableContainer.renderGridLayout()
  .then(() => {
    tableContainer.initGridTable();
    gridEvent.initEvent(tableContainer.gridContainer);
    contextMenu.$menuHolderEl = tableContainer.layout;
    gridEvent.subscribeContextMenuEvent(tableContainer.gridContainer);
  })

window.addEventListener("insertBeforeThis", ({
  detail
}) => {
  const { rowIndex } = detail;
  const rowLength = tableContainer.dataAdapter.rows.length;

  emptyRow.id = rowLength + 1;

  if (rowIndex === 0) {
    tableContainer.dataAdapter.rows.unshift(emptyRow);
  } else {
    const beforeRows = tableContainer.dataAdapter.rows.slice(0, rowIndex);
    beforeRows.push(emptyRow);
    const afterRows = tableContainer.dataAdapter.rows.slice(rowIndex);
    tableContainer.dataAdapter.rows = [...beforeRows, ...afterRows];
  }

  tableContainer.dataAdapter.defaultRows = tableContainer.dataAdapter.rows.slice(0);

  DataAdapter.$defaultRows = tableContainer.dataAdapter.defaultRows;
  tableContainer.renderColumns(true);
});

window.addEventListener("insertAfterThis", ({
  detail
}) => {
  const { rowIndex } = detail;
  const rowLength = tableContainer.dataAdapter.rows.length;

  emptyRow.id = rowLength + 1;

  if (rowIndex === rowLength - 1) {
    tableContainer.dataAdapter.rows.push(emptyRow);
  } else {
    const beforeRows = tableContainer.dataAdapter.rows.slice(0, rowIndex + 1);
    beforeRows.push(emptyRow);
    const afterRows = tableContainer.dataAdapter.rows.slice(rowIndex + 1);
    tableContainer.dataAdapter.rows = [...beforeRows, ...afterRows];
  }

  tableContainer.dataAdapter.defaultRows = tableContainer.dataAdapter.rows.slice(0);

  DataAdapter.$defaultRows = tableContainer.dataAdapter.defaultRows;
  tableContainer.renderColumns(true);
});

window.addEventListener("deleteThis", ({ detail }) => {
  const { rowIndex } = detail;

  tableContainer.dataAdapter.rows.splice(rowIndex, 1);
  tableContainer.dataAdapter.defaultRows = tableContainer.dataAdapter.rows.slice(0);

  DataAdapter.$defaultRows = tableContainer.dataAdapter.defaultRows;
  tableContainer.renderColumns(true);
})