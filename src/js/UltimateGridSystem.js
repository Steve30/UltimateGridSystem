import { TableContainer } from "./components/TableContainer.js";
import { default as GridEvent } from "./events/gridEvent.js";
import ContextMenu from "./components/ContextMenu.js";

const tableContainer = new TableContainer({
  isSearchRow: true,
  isAddRow: true,
  dragAndDropColumn: true,
  isLeadColumnCheck: true
});

const gridEvent = new GridEvent({
  deleteRow: true
});

const contextMenu = new ContextMenu();

tableContainer.renderGridLayout()
  .then(() => {
    tableContainer.initGridTable();
    gridEvent.initEvent(tableContainer.gridContainer);

    tableContainer.gridContainer.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      const { clientX, clientY } = event;
      contextMenu.render(clientX, clientY);
    });
  })
