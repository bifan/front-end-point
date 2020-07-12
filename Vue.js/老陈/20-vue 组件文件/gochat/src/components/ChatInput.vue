<template>
  <div>
    <input type="text" @keydown.enter="sendMsg($event.target.value)" />
    <button @click="sendMsg($event.target.previousSibling.value)">发送</button>
  </div>
</template>

<script>
export default {
  name: "ChatInput",
  props: ["sendMsg"]
};
</script>

<style scoped></style>
