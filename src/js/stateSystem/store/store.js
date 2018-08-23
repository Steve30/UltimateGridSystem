import PubSub from "../PubSub.js";

export default class Store {

  constructor (params = {
    actions: {},
    mutations: {},
    state: {}
  }) {

    const self = this;

    this.actions = params.actions;
    this.mutations = params.mutations;
    this.status = "resting";
    this.state = params.state;
    this.events = new PubSub();

    this.stateProxy = new Proxy(this.state, {
      set: (state, key, value) => {

        state[key] = value;

        self.events.publish("stateChange", self.state);
        self.status = "resting";

        return true;
      }
    });

  }

  dispatch (actionKey, payLoad) {

    if (typeof this.actions[actionKey] !== "function") {
      return false;
    }

    this.status = "action";
    this.actions[actionKey](this, payLoad);

    return true;
  }

  commit (mutationKey, payload) {

    if (typeof this.mutations[mutationKey] !== "function") {
      return false;
    }

    this.status = "mutation";

    const newState = this.mutations[mutationKey](this.state, payload);

    Object.assign(this.stateProxy, newState);

    return true;
  }


}