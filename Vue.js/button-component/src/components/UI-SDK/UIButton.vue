<template>
  <!--
    v-on="$listeners"
      // 相当于重新监听一遍父元素监听的所有事件
    @click="$listeners.click"
      // 相当于v-on:click="$emit('click')"
      // 监听click, 回调函数的作用就是触发一个事件, 从而调用父组件的回调函数
  -->
  <!-- <button v-on="$listeners"> -->
  <!-- <button @click="$listeners.click"> -->
  <button
    @click="$emit('click')"
    :class="{
      largeStyle: large,
      redStyle: red,
      greyStyle: grey
    }"
  >
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class UIButton extends Vue {
  // 如果存在large 属性, large 值为ture
  // 如果不存在large 属性, large 值为false
  @Prop(Boolean) private large!: boolean; // "!" 告知编译器不可能是空值(null/undefined)
  @Prop(Boolean) private grey!: boolean; // "!" 告知编译器不可能是空值(null/undefined)
  @Prop(Boolean) private red!: boolean; // "!" 告知编译器不可能是空值(null/undefined)
}
</script>

<style lang="scss" scoped>
button {
  user-select: none;
  background-color: #aaa;
  // padding: 0;
  border: 0;
  outline: 0;
  &:hover {
    filter: brightness(120%);
  }
  &:active {
    filter: brightness(80%);
  }
}
.largeStyle {
  font-size: 1.2rem;
}
.greyStyle {
  color: grey;
}
.redStyle {
  color: red;
}
</style>
// https://www.bilibili.com/video/BV1q7411i7jw
