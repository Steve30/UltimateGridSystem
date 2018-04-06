import {ColumnContainer } from "./ColumnContainer.js";

export class ActionColumnContainer extends ColumnContainer {
  constructor(columnConfig) {
    super("actions", columnConfig);
  }

  render(columnName, columnConfig) {
    const { set } = columnConfig;

    const cellTemplates = Array.from(set).map((value) => `<a style="grid-area: cell-${value}" class="cell-action cell-row">
    </a>`).join("");

    this.container.innerHTML = `<div id="${columnName}" class="column">
      <strong>Actions</strong>
      ${cellTemplates}
      <span class="end-border" style="grid-area: cell-border"></span>
    </div>`;
  }

  afterInserted() {
    this.setCssVariable();
  }
}