<template>
  <div class="user-list">
    <h1>用户列表</h1>
    <ul class="user-list__ul">
      <li
        v-for="(item, index) in userList"
        :key="index"
        @click="curUser(index)"
        class="user-list__li"
      >
        <img :src="item.imgUrl" alt="" class="user-list__avatar" />
        <h3>{{ item.name }}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props: ["userList"],
  created() {
    console.log(this.userList);
  },
  methods: {
    curUser(index) {
      this.$emit("click", index);
    }
  }
};
</script>

<style scoped>
.user-list__ul {
  list-style: none;
}
.user-list__li {
  display: flex;
  margin-bottom: 10px;
}
.user-list__avatar {
  width: 50px;
  margin-right: 10px;
}
</style>
