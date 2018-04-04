import { DataAdapter } from "../adapters/dataAdapter.js";

export default class {
  constructor(columnName) {
    this.columnName = columnName;
    this.rows = DataAdapter.$defaultRows.slice(0);
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
        DataAdapter.$defaultRows = this.rows;
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

    document.dispatchEvent(new CustomEvent("sorted", {
      detail: {
        columnName: this.columnName,
        sortClass: element.classList.item(2)
      }
    }))
  }

}