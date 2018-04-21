import { DropdownColumnContainer } from "./DropdownColumnContainer.js";

export class MultiDropdownColumnContainer extends DropdownColumnContainer {
  constructor(columnName, columnConfig) {
    super(columnName, columnConfig);

    this.selectedItemSet = new Set();

    document.addEventListener("enterOnMultiDropDown", () => {
      const values = Array.from(this.selectedItemSet.values()).join(";");

      this.currentDropdown.dispatchEvent(new Event("click"));
      this.currentDropdown.control.value = values;
      this.currentDropdown.control.dispatchEvent(new Event("change"));

      this.setExistCheckedItem();
    });

  }

  generateDropdownListItems(dropdownSet) {
    return Array.from(dropdownSet).map(value => `<a href="" data-check="&#x2713;" data-value="${value}"><span>${value}</span></a>`).join("");
  }

  afterInserted() {
    super.afterInserted();
  }

  initClickEventForItem(clickElements, isRemove = false) {
    super.initClickEventForItem(clickElements, isRemove);
    this.listItems = clickElements;

    if (!isRemove) {
      this.setExistCheckedItem();
    }
  }

  setExistCheckedItem() {

    this.selectedItemSet.clear();

    this.listItems.forEach(element => {
      const {
        dataset: {
          value
        }
      } = element;

      if (this.currentDropdown.control.value.includes(value)) {
        element.classList.add("checked");
        this.selectedItemSet.add(value);
      }
    })
  }

  onClickedItem(event) {
    event.preventDefault();

    const {
      target
    } = event;
    const element = target.tagName === "SPAN" ? target.parentElement : target;
    const {
      dataset: {
        value
      }
    } = element;

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