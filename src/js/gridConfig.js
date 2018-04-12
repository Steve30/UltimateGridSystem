const leadColumnIdentity = "id";

const defaultConfig = {
  isSearchRow: false,
  isAddRow: false,
  dragAndDropColumn: false,
  dragAndDropRow: false,
  isLeadColumnCheck: false
};

const columnConfigs = [{
  id: leadColumnIdentity,
  title: null,
  isAddRow: true,
  isSearchRow: true
}, {
  id: "names",
  title: "Names",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true
}, {
  id: "sexes",
  title: "Sexes",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true
}, {
  id: "adults",
  title: "Adults",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true
}];

const emptyRow = {
  [leadColumnIdentity]: null,
  names: "",
  sexes: "",
  adults: ""
}

export {
  leadColumnIdentity,
  defaultConfig,
  columnConfigs,
  emptyRow
};