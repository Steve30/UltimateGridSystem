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
  isOrder: true,
  width: "400px"
}, {
  id: "sexes",
  title: "Sexes",
  filterType: "multiString",
  type: "multi-dropdown",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true,
  width: "400px"
}, {
  id: "adults",
  title: "Adults",
  filterType: "boolean",
  type: "checkbox",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true,
  width: "400px"
}, {
  id: "city",
  title: "City",
  filterType: "string",
  type: "simple",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true,
  width: "400px"
}, {
  id: "zipcode",
  title: "Zipcode",
  filterType: "number",
  type: "simple",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true,
  width: "400px"
}, {
  id: "street",
  title: "Street",
  filterType: "string",
  type: "simple",
  isAddRow: true,
  isSearchRow: true,
  isOrder: true,
  width: "400px"
}];

export {
  leadColumnIdentity,
  defaultConfig,
  columnConfigs
};