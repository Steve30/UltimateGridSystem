import { DropdownColumnContainer } from "./DropdownColumnContainer.js";

export class MultiDropdownColumnContainer extends DropdownColumnContainer {
  constructor(columnName, columnConfig) {
    super(columnName, columnConfig);
  }

  generateDropdownListItems() {
    this.list = "";

    for (const value of this.dropDownListSet.values()) {
      if (value) {
        this.list += `<a href="" data-check="&#x2713;" data-value="${value}">
        <span>${value}</span></a>`;
      }
    }
  }

  afterInserted() {
    super.afterInserted();
  }

  onClickedItem(event) {
    event.preventDefault();

    const { target } = event;
    const { dataset: { value } } = target;

    target.classList.toggle("checked");

    console.log(value);
  }
}