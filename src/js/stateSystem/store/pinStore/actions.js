export default {
  pinItem (context, payload) {
    context.commit("pinItem", payload);
  },
  unPinItem (context, payload) {
    context.commit("unPinItem", payload);
  }
}