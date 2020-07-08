<template>
  <div class="chat-area">
    <div v-if="curUser">
      <h1>{{ curUser.name }}</h1>
    </div>
    <h1 v-else>聊天信息</h1>
  </div>
</template>

<script>
export default {
  name: "ChatArea",
  props: ["curUser"]
};
</script>

<style scoped></style>
