import { DataAdapter } from "../adapters/dataAdapter.js";

export default class {
  constructor(columnName) {
    this.columnName = columnName;
    console.log(DataAdapter.$defaultRows);
  }

  getTemplate() {
    return `<i class="sort fa fa-sort"></i>`;
  }

  sortAction(element) {

    const className = element.classList.item(2);

    switch (className) {
      case "fa-sort-asc":
        element.classList.replace(className, "fa-sort-desc");
        break;
      case "fa-sort-desc":
        element.classList.replace(className, "fa-sort-asc");
        break;
      default:
        element.classList.replace(className, "fa-sort-asc");
        break;
    }
  }

}