import {
  TableContainer
} from "../components/TableContainer.js";
import {
  ColumnContainer
} from "../components/ColumnContainer.js";

export class SearchEvent {
  constructor(tableContainer = TableContainer) {
    this.tableContainer = tableContainer;
    this.isSearchInDefaultRows = true;
  }

  searchPromise() {
    return new Promise((resolve) => {
      const {
        $allSearchFieldPromise
      } = ColumnContainer;

      if ($allSearchFieldPromise.length > 0) {
        Promise.race($allSearchFieldPromise).then(search => {
          const {
            columnName,
            searchValue
          } = search;
          this.isSearchInDefaultRows = true;

          let find = this.tableContainer.searchedColumns.find(item => item && item[columnName]);

          this.setTableContainerRows();

          if (find) {
            find[columnName] = searchValue;
          } else {
            this.tableContainer.searchedColumns.push({
              [columnName]: searchValue
            });
          }

          resolve(true);
        })
      } else {
        resolve(false);
      }
    });
  }

  setTableContainerRows(columnName, searchValue) {

    if (this.tableContainer.searchedColumns.length > 0) {
      this.tableContainer.searchedColumns.forEach(searchColumn => {
        for (const [column, value] of Object.entries(searchColumn)) {
          if (column !== columnName) {
            this.tableContainer.rows = this.tableContainer.getFilteredRows(column, value);
            this.isSearchInDefaultRows = false;
          }
        }
      })
    }

    this.tableContainer.rows = this.tableContainer.getFilteredRows(columnName, searchValue, this.isSearchInDefaultRows);
  }
}