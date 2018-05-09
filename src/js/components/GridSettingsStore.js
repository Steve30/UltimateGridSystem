export class GridSettingsStore {
  constructor() {
    if (!GridSettingsStore.singleton) {
      GridSettingsStore.storeName = "GridSettingsStore";
      GridSettingsStore.singleton = this;
    }
  }

  initSettingsStore() {
    const store = localStorage.getItem(GridSettingsStore.storeName);

    if (store) {
      GridSettingsStore.storeMap = new Map([JSON.parse(store)]);
    } else {
      GridSettingsStore.storeMap = new Map();
    }

    return Promise.resolve();
  }

  initConfigMap(mapName) {
    let configMap = GridSettingsStore.storeMap.get(mapName);
    const isInstanceOfMap = configMap instanceof Map;

    if (!isInstanceOfMap) {
      if (configMap) {
        configMap = new Map(configMap);
      } else {
        configMap = new Map();
      }
    }

    return configMap;
  }

  static saveStoreToLocalStorage() {

    for (const [key, config] of this.storeMap.entries()) {
      if (config instanceof Map) {
        this.storeMap.set(key, Array.from(config));
      }
    }

    localStorage.setItem(GridSettingsStore.storeName, JSON.stringify(...GridSettingsStore.storeMap))
  }

  static saveColumnPosition(columnName, positionConfig) {
    let positionConfigMap = this.singleton.initConfigMap("positionConfigMap");
    positionConfigMap.set(columnName, positionConfig);
    this.storeMap.set("positionConfigMap", positionConfigMap);

    return Promise.resolve();
  }

  static getColumnsByPosition() {
    const positionConfigMap = this.singleton.initConfigMap("positionConfigMap");

    let columns = [];

    for (const [name, {
        position,
        width
      }] of positionConfigMap.entries()) {
      columns[position] = {
        name,
        width
      };
    }

    return columns;
  }

  static saveFilterConfig(columnName, filterValue) {
    this.storeMap.set("filterConfig", {
      columnName: filterValue
    });
    this.saveStoreToLocalStorage();
  }

  static getExistStoreSetting(type, columnName) {
    const config = this.storeMap.get(type);
    return config && config[columnName] ? config[columnName] : false;
  }

  static saveOrderConfig(columnName, orderType) {
    this.storeMap.set("orderConfig", {
      columnName: orderType
    });
    this.saveStoreToLocalStorage();
  }

}