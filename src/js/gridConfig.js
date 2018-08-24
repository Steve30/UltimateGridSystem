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
  filterType: "string",
  type: "simple",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true
}, {
  id: "sexes",
  title: "Sexes",
  filterType: "multiString",
  type: "multi-dropdown",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true
}, {
  id: "adults",
  title: "Adults",
  filterType: "boolean",
  type: "checkbox",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true
}, {
  id: "city",
  title: "City",
  filterType: "string",
  type: "simple",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true
}, {
  id: "zipcode",
  title: "Zipcode",
  filterType: "number",
  type: "simple",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true
}, {
  id: "street",
  title: "Street",
  filterType: "string",
  type: "simple",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true
}];

export {
  leadColumnIdentity,
  defaultConfig,
  columnConfigs
};