import { DropdownColumnContainer } from "../components/DropdownColumnContainer.js";

export default class {
  constructor({ deleteRow }) {
    this.deleteRow = deleteRow;
  }

  initEvent(element) {
    document.addEventListener("keydown", (event) => {
      const { keyCode } = event;

      switch (keyCode) {
        case 46:

          if (this.deleteRow) {
            event.preventDefault();
            element.dispatchEvent(new Event("deleteKeyDown"));
          }

          break;

        case 13:
          if (DropdownColumnContainer.$currentDropdownConstructor === "MultiDropdownColumnContainer") {
            event.preventDefault();
            document.dispatchEvent(new Event("enterOnMultiDropDown"));
          }
          break;

        default:
          break;
      }
    })
  }
}