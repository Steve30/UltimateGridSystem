import { DropdownColumnContainer } from "./DropdownColumnContainer.js";

export class MultiDropdownColumnContainer extends DropdownColumnContainer {
  constructor(columnName, columnConfig) {
    super(columnName, columnConfig);

    this.selectedItemSet = new Set();

    document.addEventListener("enterOnMultiDropDown", () => {
      const values = Array.from(this.selectedItemSet.values()).join(";");

      this.labelEl.dispatchEvent(new Event("click"));
      this.labelEl.control.value = values;
      this.labelEl.control.dispatchEvent(new Event("change"));
    });

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
    this.labelEl = this.columnEl.querySelector(".dropdown-holder label");
  }

  onClickedItem(event) {
    event.preventDefault();

    const { target } = event;
    const element = target.tagName === "SPAN" ? target.parentElement : target;
    const { dataset: { value } } = element;

    switch (value) {
      case "-all-":
      case "-empty cells-":
        this.currentDropdown.control.value = value === "-all-" ? "" : value;
        this.currentDropdown.dispatchEvent(new Event("click"));

        setTimeout(() => {
          this.currentDropdown.control.dispatchEvent(new Event("change"));
        }, 10);

        this.selectedItemSet.clear();
        break;
      default:
        const isChecked = element.classList.toggle("checked");

        if (isChecked) {
          this.selectedItemSet.add(value);
        } else {
          this.selectedItemSet.delete(value);
        }
        break;
    }
  }
}