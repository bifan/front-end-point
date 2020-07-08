<template>
  <div id="app">
    <ChatArea :curUser="curUser" />
    <UserList :userList="userList" @click="toggleCurUser" />
  </div>
</template>

<script>
import ChatArea from "./components/ChatArea.vue";
import UserList from "./components/UserList.vue";

export default {
  name: "App",
  components: {
    ChatArea,
    UserList
  },
  data() {
    return {
      userList: [
        {
          key: 1,
          name: "ming",
          // 开发中用的url 和构建后用的url 可能不同
          // 比如放在不同的文件夹中以便支持不同的格式和大小
          // 比如文件名增加了随机数以便更新缓存
          imgUrl: require("./assets/avatar/1.jpg")
        },
        {
          key: 2,
          name: "mei",
          imgUrl: require("./assets/avatar/2.jpg")
        },
        {
          key: 3,
          name: "niu",
          imgUrl: require("./assets/avatar/3.jpg")
        },
        {
          key: 4,
          name: "po",
          imgUrl: require("./assets/avatar/4.jpg")
        }
      ],
      curUser: null
    };
  },
  methods: {
    toggleCurUser(index) {
      this.curUser = this.userList[index];
    }
  }
};
</script>

<style></style>
