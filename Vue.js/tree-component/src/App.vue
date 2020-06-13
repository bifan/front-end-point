<template>
  <div id="app">
    <MyTree :nodes="nodes"></MyTree>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getTreeList } from "./client/index.js";
import MyTree from "@/components/MyTree.vue";

@Component({
  components: { MyTree }
})
export default class App extends Vue {
  private treeList = "";
  private nodes = [];
  private mounted() {
    // console.log("nodes:", this.nodes);
    // this.treeList = getTreeList().then(data => {});
    getTreeList().then(res => {
      // this.treeList = res.data;
      // console.log("res.data:", res.data);
      /*
        child: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
        code: 0
        parent: (5) [{…}, {…}, {…}, {…}, {…}]
      */

      this.nodes = [...res.data.parent, ...res.data.child];
      // console.log("nodes:", this.nodes);
      /*
        0: {name: "文件夹1", pid: 0, id: 1}
        1: {name: "文件夹2", pid: 0, id: 2}
        2: {name: "文件夹3", pid: 0, id: 3}
        3: {name: "文件夹1-1", pid: 1, id: 4}
        4: {name: "文件夹2-1", pid: 2, id: 5}
        5: {name: "文件1", pid: 1, id: 10001}
        6: {name: "文件2", pid: 1, id: 10002}
        7: {name: "文件2-1", pid: 2, id: 10003}
        8: {name: "文件2-2", pid: 2, id: 10004}
        9: {name: "文件1-1-1", pid: 4, id: 10005}
        10: {name: "文件2-1-1", pid: 5, id: 10006}
      */
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #aaa;
  margin-top: 60px;
}
body {
  background-color: #333;
}
</style>
