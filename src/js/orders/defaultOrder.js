import {
  DataAdapter
} from "../adapters/dataAdapter.js";
import {
  TableContainer
} from "../components/TableContainer.js";

export default class {

  static set $defaultOrderRows(value) {
    this.defaultOrderRows = value;
  }

  static get $defaultOrderRows() {
    return this.defaultOrderRows;
  }

  constructor(columnName) {
    this.columnName = columnName;

    if (!DataAdapter.$defaultSortRows) {
      DataAdapter.$defaultSortRows = DataAdapter.$defaultRows.slice(0);
    }
  }

  getTemplate(sortClass = "fa-sort") {
    return `<i class="sort fa ${sortClass}"></i>`;
  }

  sortAction(element) {

    const className = element.classList.item(2);

    switch (className) {
      case "fa-sort-asc":
        element.classList.replace(className, "fa-sort-desc");

        DataAdapter.$defaultRows.sort((left, right) => {
          const lValue = left[this.columnName];
          const rValue = right[this.columnName];

          return lValue.localeCompare(rValue);
        });

        DataAdapter.$defaultRows.reverse();

        break;
      case "fa-sort-desc":
        element.classList.replace(className, "fa-sort");
        DataAdapter.$defaultRows = DataAdapter.$defaultSortRows.slice(0);
        break;
      default:
        element.classList.replace(className, "fa-sort-asc");
        DataAdapter.$defaultRows.sort((left, right) => {
          const lValue = left[this.columnName];
          const rValue = right[this.columnName];

          return lValue.localeCompare(rValue);
        });
        break;
    }

    TableContainer.rowSortChangeProxy[0] = {
      columnName: this.columnName,
      sortClass: element.classList.item(2)
    }
  }

}