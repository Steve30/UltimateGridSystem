export class DropdownBuilder {
  static build(columnMap) {
    this.dropdownMap = new Map();

    columnMap.forEach(({ columnConfig }, key) => {
      if (key.includes("dropdown")) {
        const dropdownList = Array.from(columnConfig.set).map(({ value }) => value).filter(value => value !== "");

        this.dropdownMap.set(columnConfig.id, new Set(dropdownList));
      }
    })
  }

  static getCurrentDropdown(id) {
    return this.dropdownMap.get(id);
  }
}