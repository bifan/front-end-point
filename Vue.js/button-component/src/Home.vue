<template>
  <div>
    <div>
      <UIButton @click="logMsg" grey :large="large" :normal="normal"
        >摁🐂</UIButton
      >
    </div>
    <div class="btn-group">
      <UIButton @click="changeSize('large')">变大</UIButton>
      <UIButton @click="changeSize('normal')">正常</UIButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UIButton from "@/components/UI-SDK/UIButton.vue";

@Component({
  components: { UIButton }
})
export default class Home extends Vue {
  private large = false;
  private normal = false;
  private logMsg() {
    console.log("UIButton clicked");
  }
  private changeSize(size: string) {
    switch (size) {
      case "large":
        this.large = true;
        this.normal = false;
        break;
      case "normal":
        this.normal = true;
        this.large = false;
        break;
    }
  }
}
</script>

<style lang="scss">
.btn-group {
  margin-top: 1em;
  button {
    margin-left: 1em;
  }
}
</style>
