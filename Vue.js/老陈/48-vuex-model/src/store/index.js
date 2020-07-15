import Vue from "vue";
import Vuex from "vuex";
import modelA from "./model-a";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { v: true },
  mutations: {},
  actions: {},
  modules: { modelA }
});
