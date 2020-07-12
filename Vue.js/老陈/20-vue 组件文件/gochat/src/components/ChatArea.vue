<template>
  <div class="chat-area">
    <div v-if="curUser">
      <h1>{{ curUser.name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatArea",
  props: ["curUser"]
};
</script>

<style scoped></style>
