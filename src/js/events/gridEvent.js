export default class {
  constructor({ deleteRow }) {
    this.deleteRow = deleteRow;
  }

  initEvent(element) {
    document.addEventListener("keydown", (event) => {
      const { keyCode } = event;

      switch (keyCode) {
        case 46: // DEL

          if (this.deleteRow) {
            event.preventDefault();
            element.dispatchEvent(new Event("deleteKeyDown"));
          }

          break;
        case 27: // ESC
          this.callHideCellContextMenuEvent();
          break;
        default:
          break;
      }
    })

    document.addEventListener("mousedown", (event) => {
      const { target: { offsetParent } } = event;

      if (!offsetParent || !offsetParent.classList.contains("context-menu")) {
        this.callHideCellContextMenuEvent();
      }
    })
  }

  callHideCellContextMenuEvent() {
    if (this.isShowCellContextMenu) {
      window.dispatchEvent(new Event("hideCellContextMenu"));
      delete this.isShowCellContextMenu;
    }
  }

  subscribeContextMenuEvent(element) {
    element.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const { target: { offsetTop, offsetLeft, labels } } = event;

      if (labels) {
        const labelEl = labels.item(0);
        const { dataset: {rowIndex} } = labelEl;
        const isCellLabel = labelEl.classList.contains("cell-label");

        if (isCellLabel) {
          this.isShowCellContextMenu = true;

          window.dispatchEvent(new CustomEvent("cellContextMenu", {
            detail: {
              offsetTop,
              offsetLeft,
              rowIndex
            }
          }))
        }

      }

    })

  }
}