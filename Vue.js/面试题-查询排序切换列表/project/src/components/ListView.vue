<template>
  <div>
    <ul>
      <li v-for="item in fileNames" :key="item.key">{{ item.fileName }}</li>
    </ul>
  </div>
</template>

<script>
// import { Component, Vue, Prop } from "vue-property-decorator";
// export default class ListView extends Vue {
//   @Prop({ type: Array, default: () => ["hi.file"] })
//   private fileNames;
// }
export default {
  name: "ListView",
  props: {
    fileNames: Array
  }
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  border-bottom: 1px solid #aaa;
  padding: 0.5em 0;
}
</style>
