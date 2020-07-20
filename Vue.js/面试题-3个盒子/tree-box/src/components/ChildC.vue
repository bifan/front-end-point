<template>
  <div class="child-c">
    <button @click="subtract">-</button>
    <button @click="initRatio" class="percent">100%</button>
    <button @click="increase">+</button>
  </div>
</template>
<script>
export default {
  name: "ChildC",
  props: ["initRatio", "increase", "subtract"]
};
</script>

<style scoped>
.child-c {
  position: fixed;
  left: 0;
  bottom: 0;
}
button {
  font-size: 3em;
  padding: 0 0.5em;
}
.percent {
  font-size: 3em;
  padding: inherit;
}
</style>
