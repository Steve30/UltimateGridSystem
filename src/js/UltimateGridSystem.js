import {
  TableContainer
} from "./components/TableContainer.js";
import {
  default as GridEvent
} from "./events/gridEvent.js";
import {
  GridSettingsStore
} from "./components/GridSettingsStore.js";

const tableContainer = new TableContainer({
  isSearchRow: true,
  isAddRow: true,
  dragAndDropColumn: true,
  isLeadColumnCheck: true
});

const gridEvent = new GridEvent({
  deleteRow: true
});

const gridSettingsStore = new GridSettingsStore();

tableContainer.renderGridLayout()
  .then(() => {
    return gridSettingsStore.initSettingsStore();
  })
  .then(() => {
    tableContainer.initGridTable();
    gridEvent.initEvent(tableContainer.gridContainer);
  })