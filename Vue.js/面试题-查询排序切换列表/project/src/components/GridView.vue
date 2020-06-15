<template>
  <div>
    <ul>
      <li v-for="item in fileNames" :key="item.key">{{ item.fileName }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GridView",
  props: {
    fileNames: Array
  }
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  display: flex;
  // justify-content: space-between;
}
li {
  border: 1px solid #aaa;
  padding: 0.5em;
  margin-right: 1em;
}
</style>
