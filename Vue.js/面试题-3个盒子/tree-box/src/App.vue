<template>
  <div id="app">
    <ChildA>A</ChildA>
    <ChildB :ratio="ratio">B</ChildB>
    <ChildC
      :initRatio="initRatio"
      :increase="increase"
      :subtract="subtract"
    ></ChildC>
  </div>
</template>

<script>
import ChildA from "./components/ChildA.vue";
import ChildB from "./components/ChildB.vue";
import ChildC from "./components/ChildC.vue";

export default {
  name: "App",
  data() {
    return {
      ratio: 1
    };
  },
  mounted() {
    this.initRatio();
  },
  methods: {
    initRatio() {
      const viewPortEightyPercent = window.innerWidth * 0.8;
      this.ratio = viewPortEightyPercent / 2000;
    },
    increase() {
      this.ratio = this.ratio + this.ratio * 0.1;
    },
    subtract() {
      this.ratio = this.ratio - this.ratio * 0.1;
    }
  },
  components: {
    ChildA,
    ChildB,
    ChildC
  }
};
</script>

<style></style>
