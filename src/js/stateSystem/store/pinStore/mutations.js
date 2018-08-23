export default {
  pinItem (state, payload) {

    state.pinnedColumns.clear();
    state.pinnedColumns.add(payload);

    return state;
  },
  unPinItem(state, payload) {
    state.pinnedColumns.delete(payload);

    return state;
  }
}