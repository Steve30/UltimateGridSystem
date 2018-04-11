import { TableContainer } from "./components/TableContainer.js";
import { default as GridEvent } from "./events/gridEvent.js";
import ContextMenu from "./components/ContextMenu.js";
import {default as contextMenuConfig } from "./components/contextMenus/contextMenuConfig.js";

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
