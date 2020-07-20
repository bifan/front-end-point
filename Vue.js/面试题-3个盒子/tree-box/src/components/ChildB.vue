<template>
  <div class="child-b" :style="{ zoom: ratio }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "ChildB",
  props: ["ratio"]
};
</script>
<style scoped>
.child-b {
  position: absolute;
  width: 2000px;
  height: 4000px;
  right: 0;
  top: 0;
  border: 1px solid #aaa;
  background-color: darksalmon;
  color: #eee;
  font-size: 3em;
}
</style>
