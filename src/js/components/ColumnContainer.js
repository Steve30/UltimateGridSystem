import {
  DataAdapter
} from "../adapters/dataAdapter.js";
import {
  default as defaultOrder
} from "../orders/defaultOrder.js";

export class ColumnContainer {

  static set $allSearchFieldPromise(value) {

    const isPromise = value instanceof Promise ? true : false;

    if (Array.isArray(this.allSearchFieldPromise) && isPromise) {
      this.allSearchFieldPromise.push(value);
    } else if (isPromise) {
      this.allSearchFieldPromise = [value];
    } else {
      this.allSearchFieldPromise = [];
    }

  }

  static get $allSearchFieldPromise() {
    return this.allSearchFieldPromise;
  }

  static set $selectedResizeColumn(value) {
    this.selectedResizeColumn = value;
  }

  static get $selectedResizeColumn() {
    return this.selectedResizeColumn;
  }

  static set $templateColumnsStyle(value) {
    this.templateColumnsStyle.push(value);
  }

  static get $templateColumnsStyle() {
    return this.templateColumnsStyle;
  }

  static set $maxColumnWidth(value) {
    this.maxColumnWidth = `${value}%`;
  }

  static get $maxColumnWidth() {
    return this.maxColumnWidth;
  }

  constructor(columnName, columnConfig) {
    this.container = document.querySelector("#column-template").cloneNode();
    this.columnName = columnName;

    const {
      width,
      set,
      isOrder,
      dragAndDropRow
    } = columnConfig;

    if (isOrder) {
      this.initOrderClass();
    }

    this.dragAndDropRow = dragAndDropRow;

    ColumnContainer.$templateColumnsStyle = !width ? `minmax(100px, ${ColumnContainer.$maxColumnWidth})` : width;

    this.sumOfCells = set.size;
    this.setCellTemplateAreas();

    this.columnIndex = ColumnContainer.$templateColumnsStyle.length - 1;
    this.render(columnName, columnConfig);
  }

  render(columnName, columnConfig) {
    const {
      isSearchRow,
      isAddRow,
      set,
      searchValue,
      dragAndDropColumn,
      title,
      sortClass
    } = columnConfig;

    const values = Array.from(set).map(({
      value
    }) => value);

    this.dragAndDropColumn = dragAndDropColumn;

    const searchTemplate = isSearchRow ? `<label class="searchfield-label search-row">
      <input class="searchfield" type="search" placeholder='Search in ${columnName}' name='searchfield-${columnName}' value='${searchValue ? searchValue : ""}'/>
    </label>` : "";

    const addRowTemplate = isAddRow ? `<label class="add-row-label add-row">
      <input type="text" class="add-row" name='addrow-${columnName}' placeholder="Create ${columnName}"/>
    </label>` : "";

    const cellTemplates = values.map((value, index) => `<label style="grid-area: cell-${index}" class="cell-label cell-row ${this.dragAndDropRow ? "drop-row" : ""}">
      ${this.renderCellContent(`<input type="text" value="${value}" name="${columnName}-${index}" readonly/>`)}
    </label>`).join("");

    this.setExistRowValues(values);

    this.container.innerHTML = `<div id="${columnName}" class="column">
      <header>
        <a href="" class="title">
          <span>${title}</span>
          <span>
            ${this.order ? this.order.getTemplate(sortClass) : ""}
            <i class="pin fas fa-thumbtack"></i>
          </span>
        </a>
        ${searchTemplate}
        ${addRowTemplate}
      </header>
      ${cellTemplates}
      <footer></footer>
      <a href="" class="resize-border" style="grid-area: cell-border"></a>
    </div>`;
  }

  renderCellContent(originalContent) {
    let content = originalContent;
    return content;
  }

  setExistRowValues(values) {
    values.forEach((value, index) => {
      ColumnContainer.existRowChanges[index][this.columnName] = value;
    });
  }

  initOrderClass() {
    this.order = new defaultOrder(this.columnName);
  }

  static resetTemplateColumnsStyle() {
    this.templateColumnsStyle = [];
  }

  static setCurrentTemplateColumn(index, value) {
    value = value < 200 ? 200 : value;

    this.templateColumnsStyle[index] = `minmax(100px,${value}px)`;
  }

  setCellTemplateAreas() {
    const cellTemplateAreas = [];

    for (let i = 0; i < this.sumOfCells; i++) {
      cellTemplateAreas.push(`"cell-${i} cell-border"`);
    }

    this.cellTemplateAreas = cellTemplateAreas.join(" ");
  }

  cloneContent() {
    return document.importNode(this.container.content, true);
  }

  afterInserted(store) {
    this.setCssVariable();
    this.addPromiseSearchField();
    this.subscribeCellClickEvent();
    this.subscribeRowResizeEvent();

    if (this.dragAndDropColumn) {
      this.setDragAndDropAction();
    }

    this.columnEl.querySelector(".title").addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      const {
        target
      } = event;

      if (target.classList.contains("sort")) {
        this.order.sortAction(target);
      }

      if (target.classList.contains("pin")) {

        if (store.state.pinnedColumns.has(this.columnName)) {
          store.dispatch("unPinItem", this.columnName);
        } else {
          store.dispatch("pinItem", this.columnName);
        }

      }
    })
  }

  // Override
  afterContentInit() {
    if (this.dragAndDropRow) {
      const allDropRowElements = this.columnEl.querySelectorAll(".drop-row");

      let draggedItem = null,
          draggedContent = null,
          replaceContent = null,
          isReplaced = false;

      allDropRowElements.forEach((element, index) => {
        element.setAttribute("draggable", true);

        element.ondragstart = (event) => {

          const {currentTarget} = event;

          draggedItem = currentTarget;
          draggedContent = currentTarget.innerHTML;
          event.dataTransfer.effectAllowed = "move";

        }

        element.ondragover = (event) => {
          event.preventDefault();

          const {currentTarget} = event;

          if (currentTarget.style.gridArea !== draggedItem.style.gridArea && !isReplaced) {

            replaceContent = currentTarget.innerHTML;

            currentTarget.innerHTML = draggedContent;
            draggedItem.innerHTML = replaceContent;

            isReplaced = true;
          }

        }

        element.ondragleave = (event) => {
          event.preventDefault();

          if (isReplaced) {
            const currHtml = event.currentTarget.innerHTML;
            event.currentTarget.innerHTML = replaceContent;
            draggedItem.innerHTML = currHtml;
            isReplaced = false;
          }
        }

        element.ondrop = (event) => {
          event.preventDefault();

          event.dataTransfer.dropEffect = "move";

          const {parentElement} = event.target;

          allDropRowElements.forEach((element, index) => {
            if (element === parentElement) {
              console.log(parentElement, index);
            } else if (element === draggedItem) {
              console.log(draggedItem, index);
            }
          });
        }

      })
    }
  }

  setCssVariable() {
    this.columnEl = document.querySelector(`#${this.columnName}`);

    this.columnEl.style.gridArea = this.columnName !== "lead" ? this.columnName : "id";
    this.columnEl.style.setProperty("--cell-template-areas", this.cellTemplateAreas);
    this.columnEl.style.setProperty("--sum-of-cell", this.sumOfCells);
  }

  addPromiseSearchField() {
    const searchFieldEl = document.querySelector(`[name=searchfield-${this.columnName}]`);

    if (searchFieldEl) {
      const promise = new Promise(resolve => {
        searchFieldEl.addEventListener("change", (event) => {
          const {
            value
          } = event.target;

          resolve({
            columnName: this.columnName,
            searchValue: value
          })
        })
      })

      ColumnContainer.$allSearchFieldPromise = promise;

    }
  }

  subscribeCellClickEvent() {

    this.existRowChanges = DataAdapter.existRowChangeProxy();

    const labels = this.columnEl.querySelectorAll(`.cell-label`);
    const addInput = this.columnEl.querySelector(`.add-row-label input`);

    if (!ColumnContainer.newRowChanges) {
      ColumnContainer.newRowChanges = {
        [this.columnName]: null
      }
    } else {
      ColumnContainer.newRowChanges[this.columnName] = null;
    }

    addInput.addEventListener("change", ({
      target: {
        value
      }
    }) => {
      ColumnContainer.newRowChange[this.columnName] = value;
    })

    labels.forEach((element) => {
      const {
        firstElementChild
      } = element;

      element.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {
          readOnly,
          name,
          value,
          type
        } = firstElementChild;

        const splitted = name.split("-");

        this.existRowChanges[splitted[1]] = {
          [this.columnName]: value
        };

        if (readOnly && type !== "checkbox") {
          firstElementChild.removeAttribute("readonly");
        }

      })

      firstElementChild.addEventListener("blur", ({
        target: {
          type
        }
      }) => {
        if (type !== "checkbox") {
          firstElementChild.readOnly = true;
        }

      })

      firstElementChild.addEventListener("change", ({
        target: {
          value,
          name,
          type
        }
      }) => {
        const splitted = name.split("-");

        this.existRowChanges[splitted[1]] = {
          [this.columnName]: value
        };

        if (type !== "checkbox") {
          firstElementChild.readOnly = true;
        } else {
          firstElementChild.value = value === "true" ? "false" : "true";
        }

      })
    })


  }

  subscribeRowResizeEvent() {
    const resizeBorderEl = this.columnEl.querySelector(`.resize-border`);

    resizeBorderEl.addEventListener("mousedown", (event) => {
      event.preventDefault();
      ColumnContainer.$selectedResizeColumn = {
        el: this.columnEl,
        index: this.columnIndex
      };
    });
  }

  setDragAndDropAction() {
    let draggedId = null;

    const headerEl = this.columnEl.querySelector("header");

    headerEl.draggable = true;
    headerEl.dataset.dragId = this.columnEl.id;

    headerEl.addEventListener("dragstart", (event) => {

      const {
        currentTarget: {
          parentElement: {
            id
          }
        }
      } = event;

      draggedId = id;

      event.dataTransfer.setData("text", id);
      event.dataTransfer.effectAllowed = "move";
    })

    headerEl.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    })

    headerEl.addEventListener("dragenter", (event) => {
      event.preventDefault();

      const {
        currentTarget: {
          dataset: {
            dragId
          },
          classList
        }
      } = event;

      const currentDropPlaceEl = document.querySelector(".current-drop-place");

      if (currentDropPlaceEl && currentDropPlaceEl.dataset.dragId !== dragId) {
        currentDropPlaceEl.classList.remove("current-drop-place");
      }

      if (dragId !== draggedId && !classList.contains("current-drop-place")) {
        classList.add("current-drop-place");
      }

    })

    headerEl.addEventListener("dragend", () => {
      const currentDropPlaceEl = document.querySelector(".current-drop-place");

      if (currentDropPlaceEl) {
        currentDropPlaceEl.classList.remove("current-drop-place");
      }
    })

    headerEl.addEventListener("drop", (event) => {
      event.preventDefault();

      const dragged = event.dataTransfer.getData("text");
      const {
        currentTarget: {
          dataset: {
            dragId: dropped
          },
          classList
        }
      } = event;

      if (dragged !== dropped) {
        classList.remove("current-drop-place");

        document.dispatchEvent(new CustomEvent("dropColumn", {
          detail: {
            dragged,
            dropped
          }
        }))
      }
    })
  }

}