import { TableContainer } from "./components/TableContainer.js";
import { default as GridEvent } from "./events/gridEvent.js";

const tableContainer = new TableContainer({
  isSearchRow: true,
  isAddRow: true,
  dragAndDropColumn: true,
  isLeadColumnCheck: true
});

const gridEvent = new GridEvent({
  deleteRow: true
});

tableContainer.renderGridLayout()
  .then(() => {
    tableContainer.initGridTable();
    gridEvent.initEvent(tableContainer.gridContainer);
  })
