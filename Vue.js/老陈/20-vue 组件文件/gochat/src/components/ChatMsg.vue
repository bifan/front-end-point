<template>
  <div class="msg">
    <ul class="msg__ul">
      <li class="msg__li" v-for="(item, index) in msgList" :key="index">
        <div class="msg__avatar"><img class="msg__img" :src="item.user.imgUrl" alt="" /></div>
        <div>{{ item.user.name }}</div>
        <div>{{ item.msg }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChatMsg",
  props: ["msgList"]
};
</script>

<style scoped>
.msg__ul {
  list-style: none;
}
.msg__li {
  display: flex;
}
.msg__avatar {
  width: 30px;
  height: 30px;
}
.msg__img {
  width: 100%;
}
</style>
