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
  title: null
}, {
  id: "names",
  title: "names"
}, {
  id: "sexes",
  title: "sexes"
}, {
  id: "adults",
  title: "adults"
  }];

export {leadColumnIdentity, defaultConfig, columnConfigs };