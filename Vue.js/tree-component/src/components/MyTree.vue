<template>
  <el-tree :data="computedData"></el-tree>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class MyTree extends Vue {
  @Prop({ type: Array, default: () => [] })
  private nodes;

  // mounted() {}

  private data = [];

  handleNodes() {
    console.log("this.nodes:", this.nodes);
    if (this.nodes.length === 0) return [];
    const combinedNodes = this.nodes.reduce((combine, node) => {
      node.label = node.name;
      combine[node.id] = node;
      return combine;
    }, {});
    // console.log("combinedNodes:", combinedNodes);
    /*
        {1: {…}, 2: {…}, 3: {…}, 4: {…}, 5: {…}, 10001: {…}, 10002: {…}, 10003: {…}, 10004: {…}, 10005: {…}, 10006: {…}}
        1: {name: "文件夹1", pid: 0, id: 1}
        2: {name: "文件夹2", pid: 0, id: 2}
        3: {name: "文件夹3", pid: 0, id: 3}
        4: {name: "文件夹1-1", pid: 1, id: 4}
        5: {name: "文件夹2-1", pid: 2, id: 5}
        10001: {name: "文件1", pid: 1, id: 10001}
        10002: {name: "文件2", pid: 1, id: 10002}
        10003: {name: "文件2-1", pid: 2, id: 10003}
        10004: {name: "文件2-2", pid: 2, id: 10004}
        10005: {name: "文件1-1-1", pid: 4, id: 10005}
        10006: {name: "文件2-1-1", pid: 5, id: 10006}
      */

    const treeNodes = this.nodes.reduce((arr, node) => {
      const pid = node.pid;
      const parent = combinedNodes[pid];
      if (parent) {
        parent.children
          ? parent.children.push(node)
          : (parent.children = [node]);
      } else if (pid === 0) {
        // arr 直接引用combineNodes 中的对象
        // 所以, 虽然只存了根节点, 但是根节点包含了所有其它节点
        arr.push(node);
      }
      return arr;
    }, []);
    // console.log("treeNodes:", treeNodes);
    // console.log("combinedNodes:", combinedNodes);
    this.data = treeNodes;
  }
  get computedData() {
    this.handleNodes();
    return this.data;
  }

  // @Watch("data", { immediate: true, deep: true })
  // onPersonChanged(val: Person, oldVal: Person) {}
}
</script>
