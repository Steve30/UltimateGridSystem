import { leadColumnIdentity } from "../gridConfig.js";
import { LeadColumnContainer } from "../components/LeadColumnContainer.js";
import { DropdownColumnContainer } from "../components/DropdownColumnContainer.js";
import { MultiDropdownColumnContainer } from "../components/MultiDropdownColumnContainer.js";
import { ColumnContainer } from "../components/ColumnContainer.js";
import { CheckboxColumnContainer } from "../components/CheckboxColumnContainer.js";

export class ColumnBuilder {

  constructor() {
    this.defaultColumnMap = new Map();
  }

  promiseBuild(columnConfig, columnName = leadColumnIdentity) {
    let column;

    this.columnConfig = columnConfig;
    this.columnName = columnName;

    let columnIdentity = columnConfig.id;

    if (columnName === leadColumnIdentity) {
      column = this.createLeadColumn();
    } else if (columnConfig.type) {

      columnIdentity += `-${columnConfig.type}`;

      switch (columnConfig.type) {
        case "simple-dropdown":
          column = this.createSimpleDropdownColumn();
          break;
        case "multi-dropdown":
          column = this.createMultiDropdownColumn();
          break;
        case "checkbox":
          column = this.createCheckboxColumn();
          break;
        default:
          column = this.createSimpleColumn();
          break;
      }
    } else {
      return Promise.reject(new TypeError(`'type' property missing or undefined in 'columnConfig' object `));
    }

    if (!this.defaultColumnMap.has(columnIdentity)) {
      this.defaultColumnMap.set(columnIdentity, {column, columnConfig});
    }

    return Promise.resolve(column);
  }

  createLeadColumn() {
    return new LeadColumnContainer(this.columnConfig);
  }

  createSimpleDropdownColumn() {
    return new DropdownColumnContainer(this.columnName, this.columnConfig);
  }

  createMultiDropdownColumn() {
    return new MultiDropdownColumnContainer(this.columnName, this.columnConfig);
  }

  createSimpleColumn() {
    return new ColumnContainer(this.columnName, this.columnConfig);
  }

  createCheckboxColumn() {
    return new CheckboxColumnContainer(this.columnName, this.columnConfig)
  }
}