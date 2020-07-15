export default {
  state: () => ({ a: 1 }),
  mutations: {
    plus(state) {
      state.a++;
    }
  }
  // actions: { ... },
  // getters: { ... }
};
