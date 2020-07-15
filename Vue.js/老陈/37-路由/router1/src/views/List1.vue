<template>
  <div>
    <h1>List 1</h1>
    <ul>
      <li v-for="(item, index) in arrs" :key="index">新闻{{ index }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "List1",
  data() {
    return {
      arrs: new Array(100)
    };
  }
};
</script>
